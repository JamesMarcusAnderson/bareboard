/* chips.js — render the BareBoard Chip Database (chip-database.json) */
(function () {
  "use strict";
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function evBadge(ev) {
    return '<span class="badge ' + (ev === "confirmed" ? "b-confirmed" : "b-likely") + '">' + esc(ev) + "</span>";
  }
  var rowsEl = document.getElementById("chip-rows");
  var countEl = document.getElementById("chip-count");
  var searchEl = document.getElementById("chip-search");
  var mfrEl = document.getElementById("chip-mfr");
  var funcEl = document.getElementById("chip-func");
  var evEl = document.getElementById("chip-ev");
  var all = [];

  function fillSelect(el, values) {
    var seen = {};
    values.forEach(function (v) {
      if (v && !seen[v]) { seen[v] = 1; }
    });
    Object.keys(seen).sort().forEach(function (v) {
      var o = document.createElement("option");
      o.value = v; o.textContent = v;
      el.appendChild(o);
    });
  }

  function matches(e) {
    var q = searchEl.value.trim().toLowerCase();
    if (q) {
      var hay = (e.chip + " " + e.device + " " + e.chip_manufacturer + " " + e["function"]).toLowerCase();
      if (hay.indexOf(q) === -1) return false;
    }
    if (mfrEl.value && e.chip_manufacturer !== mfrEl.value) return false;
    if (funcEl.value && e["function"] !== funcEl.value) return false;
    if (evEl.value && e.evidence !== evEl.value) return false;
    return true;
  }

  function render() {
    var list = all.filter(matches);
    var html = "";
    list.forEach(function (e) {
      html += "<tr><td><strong>" + esc(e.chip) + "</strong></td><td>" + esc(e.device) +
        '</td><td class="cat">' + esc(e.chip_manufacturer) + "</td><td>" + esc(e["function"]) +
        "</td><td>" + evBadge(e.evidence) + '</td><td class="src">' + esc(e.source) + "</td></tr>";
    });
    rowsEl.innerHTML = html || '<tr><td colspan="6">No chips match the current filters.</td></tr>';
    countEl.textContent = "Showing " + list.length + " of " + all.length + " chips.";
  }

  [searchEl, mfrEl, funcEl, evEl].forEach(function (el) {
    el.addEventListener("input", render);
    el.addEventListener("change", render);
  });

  fetch("chip-database.json", { credentials: "same-origin" })
    .then(function (r) { if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); })
    .then(function (data) {
      all = data.entries || [];
      fillSelect(mfrEl, all.map(function (e) { return e.chip_manufacturer; }));
      fillSelect(funcEl, all.map(function (e) { return e["function"]; }));
      render();
    })
    .catch(function (err) {
      rowsEl.innerHTML = '<tr><td colspan="6">Could not load chip-database.json (' + esc(err.message) + ").</td></tr>";
    });
})();
