// Hot 100 Renderer - BareBoard curated hardware ranking (v1.0)
// Static, sourced, editorial. No fake movement, no live pulse.
(function() {
  var container = document.getElementById('hot100-table-body');
  var updatedEl = document.getElementById('hot100-updated');
  var methodEl = document.getElementById('hot100-methodology');
  if (!container) return;

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function evidenceBadge(ev) {
    var colors = { confirmed: '#0a0', likely: '#a80', unconfirmed: '#888' };
    var c = colors[ev] || '#888';
    return '<span style="color:' + c + ';font-weight:bold;">' + esc(ev) + '</span>';
  }

  function sourceLinks(sources) {
    if (!sources || !sources.length) return '';
    return sources.map(function(s, i) {
      var label = s.type ? esc(s.type) : ('source ' + (i + 1));
      var title = s.note ? ' title="' + esc(s.note) + '"' : '';
      return '<a href="' + esc(s.url) + '"' + title + ' target="_blank" rel="noopener">[' + label + ']</a>';
    }).join(' ');
  }

  function render(data) {
    var devices = (data.devices || []).slice().sort(function(a, b) { return a.rank - b.rank; });
    container.innerHTML = devices.map(function(d) {
      var firstUrl = (d.sources && d.sources[0] && d.sources[0].url) ? d.sources[0].url : null;
      var name = firstUrl
        ? '<a href="' + esc(firstUrl) + '" target="_blank" rel="noopener">' + esc(d.name) + '</a>'
        : esc(d.name);
      return '<tr>' +
        '<td><strong>' + esc(d.rank) + '</strong></td>' +
        '<td>' + name + '<br><span style="font-size:0.8em;color:#555;">' + sourceLinks(d.sources) + '</span></td>' +
        '<td>' + esc(d.manufacturer) + '</td>' +
        '<td>' + esc(d.category) + '</td>' +
        '<td>' + evidenceBadge(d.evidence) + '</td>' +
        '<td>' + esc(d.why) + '</td>' +
        '</tr>';
    }).join('');
    if (updatedEl && data.updated) {
      updatedEl.textContent = 'Updated ' + esc(data.updated);
    }
    if (methodEl) {
      var parts = [];
      if (data.methodology) parts.push('<p>' + esc(data.methodology) + '</p>');
      if (data.ranking_basis) parts.push('<p><em>' + esc(data.ranking_basis) + '</em></p>');
      if (data.evidence_labels) {
        parts.push('<p>Evidence labels: ' +
          Object.keys(data.evidence_labels).map(function(k) {
            return '<strong>' + esc(k) + '</strong> — ' + esc(data.evidence_labels[k]);
          }).join(' ') + '</p>');
      }
      methodEl.innerHTML = parts.join('');
    }
  }

  fetch('/hot100-live.json')
    .then(function(r) { return r.json(); })
    .then(render)
    .catch(function() {
      container.innerHTML = '<tr><td colspan="6">Could not load rankings.</td></tr>';
    });
})();
