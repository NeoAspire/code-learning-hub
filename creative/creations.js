document.addEventListener('DOMContentLoaded', () => {
  const gallery = document.getElementById('creations-gallery');
  if (!gallery) return;

  // Load download counts from localStorage
  const downloadCounts = JSON.parse(localStorage.getItem('creationDownloads') || '{}');

  // Helper function to increment download count (store only per-browser delta)
  const incrementDownload = (itemId, baseCount, countBadge) => {
    downloadCounts[itemId] = (downloadCounts[itemId] || 0) + 1;
    localStorage.setItem('creationDownloads', JSON.stringify(downloadCounts));
    if (countBadge) {
      const total = (baseCount || 0) + (downloadCounts[itemId] || 0);
      countBadge.innerHTML = `📥 ${total}`;
    }
  };

  fetch('/creative/creations.json')
    .then(res => res.json())
    .then(data => renderGallery(data))
    .catch(err => {
      gallery.innerHTML = '<p style="text-align: center; color: #999;">Unable to load creations. Check creations.json.</p>';
      console.error(err);
    });

  function renderGallery(items) {
    if (!items || !items.length) {
      gallery.innerHTML = '<p style="text-align: center; color: #999;">No creations found.</p>';
      return;
    }

    const grid = document.createElement('div');
    grid.className = 'creative-grid';

    const gridContainer = document.createElement('div');
    gridContainer.className = 'grid';

    items.forEach(item => {
      const card = document.createElement('article');
      card.className = 'creative-card';

      // Thumbnail with overlay
      const thumbContainer = document.createElement('div');
      thumbContainer.className = 'thumb';

      const img = document.createElement('img');
      img.alt = item.title || 'creation';
      img.src = item.thumb || '/images/favicon/favicon.png';
      thumbContainer.appendChild(img);

      // Download count badge: combine server baseline with per-browser delta
      const countBadge = document.createElement('div');
      countBadge.className = 'download-count';
      const baseCount = item.downloads || 0;
      const storedDelta = downloadCounts[item.id] || 0;
      const displayCount = (baseCount || 0) + (storedDelta || 0);
      countBadge.innerHTML = `📥 ${displayCount}`;
      thumbContainer.appendChild(countBadge);

      // Overlay with download button
      const overlay = document.createElement('div');
      overlay.className = 'thumb-overlay';

      if (Array.isArray(item.files) && item.files.length > 0) {
        const btn = document.createElement('a');
        btn.className = 'download-btn';
        btn.href = item.files[0].url;
        btn.textContent = '⬇ Download';
        btn.setAttribute('download', '');
        btn.addEventListener('click', () => incrementDownload(item.id, baseCount, countBadge));
        overlay.appendChild(btn);
      }

      thumbContainer.appendChild(overlay);
      card.appendChild(thumbContainer);

      // Card body
      const body = document.createElement('div');
      body.className = 'card-body';

      // Meta: Category
      if (item.category) {
        const meta = document.createElement('div');
        meta.className = 'card-meta';
        meta.innerHTML = `<span class="card-category">${item.category}</span>`;
        body.appendChild(meta);
      }

      // Title
      const h3 = document.createElement('h3');
      h3.textContent = item.title || 'Untitled';
      body.appendChild(h3);

      // Author
      if (item.author) {
        const author = document.createElement('p');
        author.className = 'card-author';
        author.textContent = `By ${item.author}`;
        body.appendChild(author);
      }

      // Tags
      if (Array.isArray(item.tags) && item.tags.length > 0) {
        const tagContainer = document.createElement('div');
        tagContainer.className = 'card-tags';
        item.tags.slice(0, 3).forEach(tag => {
          const tagEl = document.createElement('span');
          tagEl.className = 'card-tag';
          tagEl.textContent = tag;
          tagContainer.appendChild(tagEl);
        });
        body.appendChild(tagContainer);
      }

      // Download button for mobile/accessibility
      if (Array.isArray(item.files)) {
        const actions = document.createElement('div');
        actions.style.display = 'flex';
        actions.style.gap = '8px';
        actions.style.marginTop = '10px';
        actions.style.flexWrap = 'wrap';

        item.files.forEach(f => {
          const a = document.createElement('a');
          a.className = 'download-btn';
          a.href = f.url;
          a.textContent = f.label;
          a.setAttribute('download', '');
          a.style.fontSize = '12px';
          a.style.padding = '6px 12px';
          a.addEventListener('click', () => incrementDownload(item.id, baseCount, countBadge));
          actions.appendChild(a);
        });
        body.appendChild(actions);
      }

      card.appendChild(body);
      gridContainer.appendChild(card);
    });

    grid.appendChild(gridContainer);
    gallery.appendChild(grid);
  }
});
