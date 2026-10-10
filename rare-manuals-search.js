// Rare Manuals filter - BareBoard
// Search + decade + rarity pills over the static manual list.
// Mirrors the Hot 150 pill pattern from hot100-live.js:
//   .pill / .pill--active buttons, click delegation, aria-live count.
// No new CSS classes; runs against the existing DOM (no fetch).
(function() {
  var searchInput = document.getElementById('rm-search');
  var filterBar = document.getElementById('rm-filters');
  var countEl = document.getElementById('rm-count');
  var entries = Array.prototype.slice.call(
    document.querySelectorAll('article.manual-entry'));
  if (!entries.length) return;

  var activeDecade = 'all';
  var activeRarity = 'all';
  var query = '';

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function matches(el) {
    if (activeDecade !== 'all' &&
        el.getAttribute('data-decade') !== activeDecade) return false;
    if (activeRarity !== 'all' &&
        el.getAttribute('data-rarity') !== activeRarity) return false;
    if (query && el.textContent.toLowerCase().indexOf(query) === -1) return false;
    return true;
  }

  function render() {
    var visible = 0;
    entries.forEach(function(el) {
      var show = matches(el);
      el.style.display = show ? '' : 'none';
      if (show) visible++;
    });
    // Hide decade sections with nothing visible.
    var heads = document.querySelectorAll('h2[data-decade]');
    for (var i = 0; i < heads.length; i++) {
      var dec = heads[i].getAttribute('data-decade');
      var anyVisible = entries.some(function(el) {
        return el.getAttribute('data-decade') === dec &&
               el.style.display !== 'none';
      });
      heads[i].style.display = anyVisible ? '' : 'none';
    }
    if (countEl) {
      countEl.textContent = 'Showing ' + visible + ' of ' +
        entries.length + ' manuals';
    }
  }

  function uniqueInOrder(attr) {
    var vals = [];
    entries.forEach(function(el) {
      var v = el.getAttribute(attr);
      if (v && vals.indexOf(v) === -1) vals.push(v);
    });
    return vals;
  }

  function buildPills() {
    if (!filterBar) return;
    var decades = uniqueInOrder('data-decade');
    var rarities = uniqueInOrder('data-rarity');

    function group(label, values, allLabel, key) {
      var html = '<span>' + esc(label) + ': </span>' +
        '<button type="button" class="pill pill--active" data-' + key +
        '="all">' + esc(allLabel) + '</button>' +
        values.map(function(v) {
          return '<button type="button" class="pill" data-' + key + '="' +
            esc(v) + '">' + esc(v) + '</button>';
        }).join('');
      return '<div role="group" aria-label="' + esc(label) +
        ' filter">' + html + '</div>';
    }

    filterBar.innerHTML =
      group('Decade', decades, 'All decades', 'decade') +
      group('Rarity', rarities, 'All', 'rarity');

    filterBar.addEventListener('click', function(e) {
      var btn = e.target.closest('.pill');
      if (!btn) return;
      var d = btn.getAttribute('data-decade');
      var r = btn.getAttribute('data-rarity');
      if (d !== null) {
        activeDecade = d;
        clearActive('data-decade');
      } else if (r !== null) {
        activeRarity = r;
        clearActive('data-rarity');
      }
      btn.classList.add('pill--active');
      render();
    });

    function clearActive(attr) {
      var pills = filterBar.querySelectorAll('.pill[' + attr + ']');
      for (var i = 0; i < pills.length; i++) {
        pills[i].classList.remove('pill--active');
      }
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', function() {
      query = searchInput.value.trim().toLowerCase();
      render();
    });
  }

  buildPills();
  render();
})();
