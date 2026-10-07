/* BareBoard datasheet index — search + category filters.
   Scoped to the "Complete datasheet index" section only (#all-datasheets). */
(function () {
  'use strict';

  var root = document.getElementById('all-datasheets');
  var searchInput = document.getElementById('ds-search');
  var catFilter = document.getElementById('ds-cat-filter');
  var countEl = document.getElementById('ds-count');
  var noResults = document.getElementById('ds-no-results');
  if (!root || !searchInput || !catFilter) return;

  // Collect category sections (direct child <section> elements with tables).
  var sections = Array.prototype.slice.call(
    root.querySelectorAll(':scope > section[id]')
  ).filter(function (s) {
    return s.querySelector('table.datasheet-table');
  });

  var state = { q: '', cat: 'all' };

  // Build category buttons from the sections' own headings.
  var allBtn = document.createElement('button');
  allBtn.type = 'button';
  allBtn.dataset.cat = 'all';
  allBtn.className = 'active';
  allBtn.setAttribute('aria-pressed', 'true');
  catFilter.appendChild(allBtn);
  sections.forEach(function (s) {
    var h = s.querySelector('h2');
    var label = h ? h.textContent.replace(/\s*\(\d+\)\s*$/, '').trim() : s.id;
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.dataset.cat = s.id;
    btn.textContent = label;
    btn.setAttribute('aria-pressed', 'false');
    catFilter.appendChild(btn);
  });
  var buttons = Array.prototype.slice.call(catFilter.querySelectorAll('button'));

  catFilter.addEventListener('click', function (e) {
    var btn = e.target.closest('button');
    if (!btn) return;
    state.cat = btn.dataset.cat;
    buttons.forEach(function (b) {
      var on = b === btn;
      b.classList.toggle('active', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    apply();
  });

  searchInput.addEventListener('input', function () {
    state.q = searchInput.value.trim().toLowerCase();
    apply();
  });

  function rowText(tr) {
    return (tr.textContent || '').toLowerCase();
  }

  function apply() {
    var q = state.q;
    var totalVisible = 0;
    var totalRows = 0;

    sections.forEach(function (s) {
      var showSection = state.cat === 'all' || state.cat === s.id;
      var rows = Array.prototype.slice.call(
        s.querySelectorAll('table.datasheet-table tbody tr')
      );
      var visibleInSection = 0;
      rows.forEach(function (tr) {
        totalRows++;
        var matchQ = !q || rowText(tr).indexOf(q) !== -1;
        var show = showSection && matchQ;
        tr.hidden = !show;
        if (show) visibleInSection++;
      });
      // Keep section visible only if it has visible rows.
      s.hidden = visibleInSection === 0;
      // Update the count in the section heading: "Name (visible/total)".
      var h = s.querySelector('h2');
      if (h) {
        var base = h.textContent.replace(/\s*\(\d+(\/\d+)?\)\s*$/, '').trim();
        if (visibleInSection !== rows.length) {
          h.textContent = base + ' (' + visibleInSection + '/' + rows.length + ')';
        } else {
          h.textContent = base + ' (' + rows.length + ')';
        }
      }
      totalVisible += visibleInSection;
    });

    // The prose-only "no public datasheet" note: show when browsing All
    // or when the search matches its text; never counted in totals.
    var note = document.getElementById('no-public-datasheet');
    if (note) {
      var showNote = (state.cat === 'all' || state.cat === 'no-public-datasheet') &&
        (!q || (note.textContent || '').toLowerCase().indexOf(q) !== -1);
      note.hidden = !showNote;
    }

    if (countEl) {
      countEl.textContent = q || state.cat !== 'all'
        ? 'Showing ' + totalVisible + ' of ' + totalRows + ' datasheets'
        : totalRows + ' datasheets indexed';
    }
    if (noResults) noResults.hidden = totalVisible !== 0;
  }

  apply();
})();
