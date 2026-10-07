/* obsolescence.js — render the Planned Obsolescence Archive (obsolescence-archive.json) */
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
  var wrap = document.getElementById("obs-cards");

  function sources(list) {
    if (!list || !list.length) return "";
    var items = list.map(function (s) {
      var label = esc(s.publisher || s.note || s.url);
      return '<li><a href="' + esc(s.url) + '" rel="noopener">' + label + "</a>" +
        (s.note ? ' <span class="src">' + esc(s.note) + "</span>" : "") + "</li>";
    }).join("");
    return '<h3>Sources</h3><ul>' + items + "</ul>";
  }

  fetch("obsolescence-archive.json", { credentials: "same-origin" })
    .then(function (r) { if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); })
    .then(function (data) {
      var html = "";
      (data.entries || []).forEach(function (e) {
        html += '<article class="card">' +
          '<span class="kicker">' + esc(e.company) + " &middot; " + esc(e.date) + "</span>" +
          "<h2>" + esc(e.title) + "</h2>" +
          "<p>" + evBadge(e.evidence) + ' <span class="src">Device: ' + esc(e.device) + "</span></p>" +
          "<p><strong>What happened:</strong> " + esc(e.what_happened) + "</p>" +
          "<p><strong>Outcome:</strong> " + esc(e.outcome) + "</p>" +
          sources(e.sources) +
          "</article>";
      });
      wrap.innerHTML = html || "<p>No cases found.</p>";
    })
    .catch(function (err) {
      wrap.innerHTML = "<p>Could not load obsolescence-archive.json (" + esc(err.message) + ").</p>";
    });
})();
