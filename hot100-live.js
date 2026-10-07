// Hot 100 Live Renderer
(function() {
  const container = document.getElementById('hot100-table-body');
  const updatedEl = document.getElementById('hot100-updated');
  const liveDot = document.getElementById('hot100-live-dot');
  if (!container) return;

  function timeAgo(iso) {
    const diff = Date.now() - new Date(iso).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'just now';
    if (mins < 60) return mins + 'm ago';
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return hrs + 'h ago';
    return Math.floor(hrs / 24) + 'd ago';
  }

  function render(data) {
    container.innerHTML = data.devices.map(d => {
      const name = d.url ? `<a href="${d.url}">${d.name}</a>` : d.name;
      const confColor = d.confidence === 'A' ? '#0a0' : d.confidence === 'B' ? '#a80' : '#888';
      return `<tr>
        <td>${d.rank}</td>
        <td>${name}</td>
        <td>${d.category}</td>
        <td>${d.units}</td>
        <td><span style="color:${confColor};font-weight:bold;">${d.confidence}</span></td>
      </tr>`;
    }).join('');
    if (updatedEl) updatedEl.textContent = 'Updated ' + timeAgo(data.updated);
    if (liveDot) liveDot.style.background = '#0a0';
  }

  // Initial load
  fetch('/hot100-live.json')
    .then(r => r.json())
    .then(render)
    .catch(() => { if (liveDot) liveDot.style.background = '#c00'; });

  // Refresh every 5 minutes
  setInterval(() => {
    fetch('/hot100-live.json?t=' + Date.now())
      .then(r => r.json())
      .then(render)
      .catch(() => {});
  }, 300000);
})();
