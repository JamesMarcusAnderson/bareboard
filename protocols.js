/* protocols.js — render the Protocol Reverse Engineering notes (protocol-re-notes.json) */
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
  var wrap = document.getElementById("proto-cards");

  function resources(res) {
    if (!res || !res.length) return "";
    var items = res.map(function (r) {
      return '<li><a href="' + esc(r.url) + '" rel="noopener">' + esc(r.name) + "</a>" +
        (r.note ? ' <span class="src">' + esc(r.note) + "</span>" : "") + "</li>";
    }).join("");
    return "<h3>Community resources</h3><ul>" + items + "</ul>";
  }

  fetch("protocol-re-notes.json", { credentials: "same-origin" })
    .then(function (r) { if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); })
    .then(function (data) {
      var html = "";
      (data.entries || []).forEach(function (e) {
        html += '<article class="card">' +
          '<span class="kicker">' + esc(e.company) + "</span>" +
          "<h2>" + esc(e.protocol) + " " + evBadge(e.evidence) + "</h2>" +
          "<p>" + esc(e.what_it_does) + "</p>" +
          "<h3>Reverse engineered</h3><p>" + esc(e.reverse_engineered) + "</p>" +
          (e.still_unknown ? "<h3>Still unknown</h3><p>" + esc(e.still_unknown) + "</p>" : "") +
          resources(e.resources) +
          "</article>";
      });
      wrap.innerHTML = html || "<p>No protocols found.</p>";
    })
    .catch(function (err) {
      wrap.innerHTML = "<p>Could not load protocol-re-notes.json (" + esc(err.message) + ").</p>";
    });
})();
