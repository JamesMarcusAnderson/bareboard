/* BareBoard site search — static index, no backend, no dependencies.
 *
 * The magnifier in the nav bar toggles a full-width frosted search panel.
 * search-index.json is fetched lazily on first open (same-origin, so the
 * existing script-src 'self' CSP is satisfied). No inline scripts anywhere.
 *
 * Keyboard: "/" or Cmd/Ctrl+K opens and focuses; Escape closes.
 * To enable, add before </body> on each page:
 *   <script src="/search.js" defer></script>
 */
(function () {
  'use strict';
  document.documentElement.classList.add('js');

  var toggle = document.querySelector('.search-toggle');
  var panel = document.getElementById('search-panel');
  var input = document.getElementById('site-search');
  var results = document.getElementById('search-results');
  var closeBtn = document.querySelector('.search-close');
  if (!toggle || !panel || !input || !results) return;

  var index = null;
  var indexFailed = false;
  var MAX_RESULTS = 8;

  function closeNavPanels() {
    document.querySelectorAll('.site-nav li.has-children.open').forEach(function (li) {
      li.classList.remove('open', 'selected');
      var a = li.querySelector(':scope > a');
      if (a) a.setAttribute('aria-expanded', 'false');
    });
  }

  function open() {
    closeNavPanels();
    panel.hidden = false;
    // Force reflow so the fade transition runs even right after unhiding.
    void panel.offsetWidth;
    panel.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    loadIndex();
    input.focus();
  }

  function close() {
    if (!panel.classList.contains('open')) return;
    panel.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    setTimeout(function () {
      if (!panel.classList.contains('open')) {
        panel.hidden = true;
        results.innerHTML = '';
      }
    }, 260);
  }

  function isOpen() {
    return panel.classList.contains('open');
  }

  // Let nav.js close search when a Finder panel opens.
  window.BareBoardSearch = { open: open, close: close, isOpen: isOpen };

  function loadIndex() {
    if (index || indexFailed) {
      if (index && input.value.trim()) search(input.value);
      return;
    }
    fetch('/search-index.json')
      .then(function (r) {
        if (!r.ok) throw new Error('http ' + r.status);
        return r.json();
      })
      .then(function (data) {
        index = data;
        if (input.value.trim()) search(input.value);
      })
      .catch(function () {
        indexFailed = true;
        results.innerHTML = '';
        var li = document.createElement('li');
        li.className = 'search-empty';
        li.textContent = 'Search is unavailable right now.';
        results.appendChild(li);
      });
  }

  function score(entry, q) {
    var s = 0;
    var title = (entry.title || '').toLowerCase();
    var heads = (entry.headings || []).join(' ').toLowerCase();
    var text = (entry.text || '').toLowerCase();
    if (title.indexOf(q) !== -1) s += 10;
    if (heads.indexOf(q) !== -1) s += 5;
    if (text.indexOf(q) !== -1) s += 2;
    if (title.toLowerCase().indexOf(q) === 0) s += 4;
    return s;
  }

  function snippetFor(entry, q) {
    var text = entry.text || '';
    var i = text.toLowerCase().indexOf(q);
    if (i === -1) return text.slice(0, 140);
    var start = Math.max(0, i - 60);
    var snip = text.slice(start, start + 160);
    return (start > 0 ? '…' : '') + snip + (start + 160 < text.length ? '…' : '');
  }

  function search(raw) {
    var q = raw.trim().toLowerCase();
    results.innerHTML = '';
    if (q.length < 2 || !index) return;
    var words = q.split(/\s+/);
    var hits = [];
    index.forEach(function (e) {
      var hay = ((e.title || '') + ' ' + (e.headings || []).join(' ') + ' ' + (e.text || '')).toLowerCase();
      var all = words.every(function (w) { return hay.indexOf(w) !== -1; });
      if (!all) return;
      hits.push({ e: e, s: score(e, q) });
    });
    hits.sort(function (a, b) { return b.s - a.s; });
    render(hits.slice(0, MAX_RESULTS), raw.trim());
  }

  function render(hits, q) {
    results.innerHTML = '';
    if (!hits.length) {
      var empty = document.createElement('li');
      empty.className = 'search-empty';
      empty.textContent = 'No results for \u201C' + q + '\u201D.';
      results.appendChild(empty);
      return;
    }
    hits.forEach(function (h) {
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = h.e.url;
      var t = document.createElement('span');
      t.className = 'res-title';
      t.textContent = h.e.title;
      var u = document.createElement('span');
      u.className = 'res-url';
      u.textContent = 'bareboard.org' + h.e.url;
      var sn = document.createElement('span');
      sn.className = 'res-snippet';
      sn.textContent = snippetFor(h.e, q.toLowerCase());
      a.appendChild(t);
      a.appendChild(u);
      a.appendChild(sn);
      li.appendChild(a);
      results.appendChild(li);
    });
  }

  function debounce(fn, ms) {
    var t;
    return function () {
      clearTimeout(t);
      var args = arguments;
      t = setTimeout(function () { fn.apply(null, args); }, ms);
    };
  }

  toggle.addEventListener('click', function () {
    if (isOpen()) close();
    else open();
  });
  if (closeBtn) closeBtn.addEventListener('click', close);

  input.addEventListener('input', debounce(function () {
    search(input.value);
  }, 120));

  document.addEventListener('keydown', function (e) {
    var tag = (document.activeElement && document.activeElement.tagName) || '';
    var typing = /^(INPUT|TEXTAREA)$/.test(tag);
    var modK = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k';
    if ((e.key === '/' && !typing) || modK) {
      e.preventDefault();
      if (!isOpen()) open();
      else input.focus();
    } else if (e.key === 'Escape' && isOpen()) {
      e.preventDefault();
      close();
      toggle.focus();
    }
  });
})();
