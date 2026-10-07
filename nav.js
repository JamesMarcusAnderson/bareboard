/* BareBoard Finder column navigation.
 *
 * The nav bar is Finder column zero. Clicking an item selects it (single
 * selection per column, Finder-style) and opens the next column to the right
 * with that item's children. Nested <ul>s in the markup describe the
 * hierarchy; this script flattens them into side-by-side columns.
 *
 * Without JS, nested lists render as an indented tree and panels open on
 * hover/focus (see style.css). To enable, add before </body> on each page:
 *   <script src="/nav.js" defer></script>
 */
(function () {
  'use strict';
  document.documentElement.classList.add('js');

  var BAR_ITEM = '.site-nav nav > ul > li.has-children';

  function barLink(li) {
    return li.querySelector(':scope > a');
  }

  function closePanel(li) {
    li.classList.remove('open', 'selected');
    var a = barLink(li);
    if (a) a.setAttribute('aria-expanded', 'false');
  }

  function closeAll(except) {
    document.querySelectorAll(BAR_ITEM).forEach(function (li) {
      if (li !== except) closePanel(li);
    });
    // Search panel is a sibling concern; never show both at once.
    var sp = document.getElementById('search-panel');
    if (sp && sp.classList.contains('open') && window.BareBoardSearch) {
      window.BareBoardSearch.close();
    }
  }

  function openPanel(li) {
    closeAll(li);
    li.classList.add('open', 'selected');
    var a = barLink(li);
    if (a) a.setAttribute('aria-expanded', 'true');
  }

  /* ---------- Finder column browser per panel ---------- */

  function addHead(col, text) {
    if (!col.querySelector(':scope > .finder-col-head')) {
      var h = document.createElement('div');
      h.className = 'finder-col-head';
      h.textContent = text;
      col.insertBefore(h, col.firstChild);
    }
  }

  function initFinder(finder, label) {
    var rootCol = finder.querySelector(':scope > ul.finder-col');
    if (!rootCol) return;

    // Detach nested lists: parentLi -> childUl. Hidden until selected.
    var kids = new Map();
    finder.querySelectorAll('li > ul').forEach(function (ul) {
      var li = ul.parentElement;
      ul.classList.add('finder-col');
      ul.hidden = true;
      kids.set(li, ul);
      li.classList.add('has-kids');
      var a = li.querySelector(':scope > a');
      if (a) a.setAttribute('aria-haspopup', 'true');
    });

    addHead(rootCol, label);

    function columns() {
      return Array.prototype.filter.call(finder.children, function (el) {
        return el.classList && el.classList.contains('finder-col');
      });
    }

    function clearAfter(col) {
      var cols = columns();
      var i = cols.indexOf(col);
      if (i === -1) return;
      cols.slice(i + 1).forEach(function (c) { finder.removeChild(c); });
    }

    function parentLiOf(col) {
      var found = null;
      kids.forEach(function (ul, li) { if (ul === col) found = li; });
      return found;
    }

    // Returns true when a child column was opened.
    function selectRow(li) {
      var col = li.parentElement;
      col.querySelectorAll(':scope > li.selected').forEach(function (s) {
        s.classList.remove('selected');
      });
      li.classList.add('selected');
      clearAfter(col);
      var child = kids.get(li);
      if (child) {
        var a = li.querySelector(':scope > a');
        addHead(child, a ? a.textContent.trim() : '');
        child.hidden = false;
        finder.appendChild(child);
        child.scrollIntoView({ block: 'nearest', inline: 'nearest' });
        return true;
      }
      return false;
    }

    finder.addEventListener('click', function (e) {
      var a = e.target.closest('a');
      if (!a || !finder.contains(a)) return;
      if (e.detail === 0) return; // keyboard activation: follow the link natively
      var li = a.closest('li');
      if (kids.has(li)) {
        if (li.classList.contains('selected')) return; // second click: follow link
        e.preventDefault();
        selectRow(li);
      } else {
        // Leaf row: mark selection, then follow the link natively.
        var col = li.parentElement;
        col.querySelectorAll(':scope > li.selected').forEach(function (s) {
          s.classList.remove('selected');
        });
        li.classList.add('selected');
      }
    });

    finder.addEventListener('keydown', function (e) {
      var a = e.target.closest('a');
      if (!a || !finder.contains(a)) return;
      var li = a.closest('li');
      var col = li.parentElement;
      var rows = Array.prototype.filter.call(col.children, function (el) {
        return el.tagName === 'LI';
      });

      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        var i = rows.indexOf(li) + (e.key === 'ArrowDown' ? 1 : -1);
        if (i >= 0 && i < rows.length) {
          var na = rows[i].querySelector(':scope > a');
          if (na) na.focus();
        }
      } else if (e.key === 'ArrowRight') {
        if (kids.has(li)) {
          e.preventDefault();
          selectRow(li);
          var first = kids.get(li).querySelector(':scope > li > a');
          if (first) first.focus();
        }
      } else if (e.key === 'ArrowLeft') {
        var cols = columns();
        if (cols.indexOf(col) > 0) {
          e.preventDefault();
          var pli = parentLiOf(col);
          finder.removeChild(col);
          if (pli) {
            var pa = pli.querySelector(':scope > a');
            if (pa) pa.focus();
          }
        }
      }
      // Enter: native link activation. Escape: handled at document level.
    });

    return { selectRow: selectRow, columns: columns };
  }

  /* ---------- Bar-level wiring ---------- */

  document.querySelectorAll(BAR_ITEM).forEach(function (li) {
    var link = barLink(li);
    var panel = li.querySelector(':scope > .col-panel');
    if (!link || !panel) return;
    var finder = panel.querySelector('[data-finder]');
    if (finder) initFinder(finder, link.textContent.trim());

    link.addEventListener('click', function (e) {
      if (e.detail === 0) return; // keyboard: handled in keydown below
      if (li.classList.contains('open')) return; // second click: follow link
      e.preventDefault();
      openPanel(li);
    });

    link.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        if (!li.classList.contains('open')) {
          e.preventDefault();
          openPanel(li);
          var first = panel.querySelector('.finder-col a');
          if (first) first.focus();
        }
        // Open already: Enter/Space follow the link natively.
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (!li.classList.contains('open')) openPanel(li);
        var f = panel.querySelector('.finder-col a');
        if (f) f.focus();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        closePanel(li);
        link.focus();
      }
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' || e.key === 'Esc') closeAll(null);
  });

  document.addEventListener('click', function (e) {
    if (!e.target.closest('.site-nav')) closeAll(null);
  });
})();
