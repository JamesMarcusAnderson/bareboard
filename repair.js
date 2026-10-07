/* repair.js — render the BareBoard Repair Guides (repair-guides.json), worst score first */
(function () {
  "use strict";
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function scoreBadge(score) {
    var cls = score <= 3 ? "score-bad" : (score <= 6 ? "score-mid" : "score-ok");
    return '<span class="badge ' + cls + '">' + esc(String(score)) + "/10</span>";
  }
  function list(items) {
    if (!items || !items.length) return "";
    return "<ul>" + items.map(function (i) { return "<li>" + esc(i) + "</li>"; }).join("") + "</ul>";
  }
  var wrap = document.getElementById("repair-cards");

  function sources(srcs) {
    if (!srcs || !srcs.length) return "";
    var items = srcs.map(function (s) {
      return '<li><a href="' + esc(s.url) + '" rel="noopener">' + esc(s.label || s.url) + "</a></li>";
    }).join("");
    return '<h3>Sources</h3><ul>' + items + "</ul>";
  }

  fetch("repair-guides.json", { credentials: "same-origin" })
    .then(function (r) { if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); })
    .then(function (data) {
      var guides = (data.guides || []).slice().sort(function (a, b) {
        return a.ifixit_score - b.ifixit_score;
      });
      var html = "";
      guides.forEach(function (g) {
        html += '<article class="card">' +
          '<span class="kicker">' + esc(g.manufacturer) + " &middot; " + esc(String(g.year)) + "</span>" +
          "<h2>" + esc(g.device) + " " + scoreBadge(g.ifixit_score) + "</h2>" +
          '<p class="src">' + esc(g.score_note || "") + " (score: " + esc(g.score_source || "iFixit") + ")</p>" +
          "<h3>Anti-repair tactics</h3>" + list(g.anti_repair_design) +
          "<h3>Tools needed</h3>" + list(g.tools_needed) +
          sources(g.sources) +
          "</article>";
      });
      wrap.innerHTML = html || "<p>No guides found.</p>";
    })
    .catch(function (err) {
      wrap.innerHTML = "<p>Could not load repair-guides.json (" + esc(err.message) + ").</p>";
    });
})();
