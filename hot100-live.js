// Hot 100 Live Renderer - The Pulse
(function() {
  const container = document.getElementById('hot100-table-body');
  const updatedEl = document.getElementById('hot100-updated');
  const liveDot = document.getElementById('hot100-live-dot');
  const pulseEl = document.getElementById('hot100-pulse');
  if (!container) return;

  function timeAgo(iso) {
    const diff = Date.now() - new Date(iso).getTime();
    const secs = Math.floor(diff / 1000);
    if (secs < 60) return secs + 's ago';
    const mins = Math.floor(secs / 60);
    if (mins < 60) return mins + 'm ago';
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return hrs + 'h ago';
    return Math.floor(hrs / 24) + 'd ago';
  }

  function trendIcon(d) {
    if (d.trend === 'up') return `<span style="color:#0a0;" title="Up ${d.trend_amount}">&#9650;${d.trend_amount}</span>`;
    if (d.trend === 'down') return `<span style="color:#c00;" title="Down ${d.trend_amount}">&#9660;${d.trend_amount}</span>`;
    return `<span style="color:#888;">&mdash;</span>`;
  }

  function render(data) {
    container.innerHTML = data.devices.map(d => {
      const name = d.url ? `<a href="${d.url}">${d.name}</a>` : d.name;
      const confColor = d.confidence === 'A' ? '#0a0' : d.confidence === 'B' ? '#a80' : '#888';
      const hot = d.trend === 'up' && d.trend_amount >= 3 ? ' <span style="background:#ff6b35;color:#fff;font-size:0.7em;padding:2px 6px;border-radius:3px;">HOT</span>' : '';
      return `<tr>
        <td><strong>${d.rank}</strong></td>
        <td>${name}${hot}</td>
        <td>${d.category}</td>
        <td>${d.units}</td>
        <td><span style="color:${confColor};font-weight:bold;">${d.confidence}</span></td>
        <td>${trendIcon(d)}</td>
      </tr>`;
    }).join('');
    if (updatedEl) updatedEl.textContent = 'Updated ' + timeAgo(data.updated);
    if (liveDot) {
      liveDot.style.background = '#0a0';
      liveDot.style.animation = 'pulse 2s infinite';
    }
    if (pulseEl && data.pulse) {
      pulseEl.innerHTML = `<strong>${data.pulse.movers_up}</strong> climbing &middot; <strong>${data.pulse.movers_down}</strong> falling`;
    }
  }

  // Add pulse animation CSS
  const style = document.createElement('style');
  style.textContent = '@keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }';
  document.head.appendChild(style);

  fetch('/hot100-live.json')
    .then(r => r.json())
    .then(render)
    .catch(() => { if (liveDot) liveDot.style.background = '#c00'; });

  setInterval(() => {
    fetch('/hot100-live.json?t=' + Date.now())
      .then(r => r.json())
      .then(render)
      .catch(() => {});
  }, 60000); // Refresh every minute
})();
