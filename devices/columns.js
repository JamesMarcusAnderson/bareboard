/* BareBoard Devices — column browser logic. Categories are the ten
   BareBoard device families; devices land here as they come off the bench. */
(function () {
  "use strict";

  var CATEGORIES = [
    { name: "Cameras & Drones", devices: [] },
    { name: "E-Readers & Tablets", devices: [] },
    { name: "Game Consoles", devices: [] },
    { name: "Media Streamers", devices: [] },
    {
      name: "Networking Gear",
      devices: [
        {
          name: "XB3",
          url: "/autopsy/xb3-tg1682g/",
          status: "Published",
          title: "XB3",
          blurb: "Our first full autopsy: the gateway we tore down to show what this platform does — verified findings only, uncertainty dated and marked.",
          facts: [
            "Intel Puma 6 \u201cCat Mountain D0\u201d \u2014 J3 UART, read-only capture",
            "Boot chain documented: U-Boot 1.2.0 / PSPU-Boot 4.2.0.45",
            "Bridge mode with persistent hidden SSIDs",
            "Personally owned, pre-paid unit \u2014 no rented hardware"
          ]
        }
      ]
    },
    { name: "Other", devices: [] },
    { name: "PCs & Single-Board", devices: [] },
    { name: "Phones", devices: [] },
    { name: "Smart Home / IoT", devices: [] },
    { name: "Wearables", devices: [] }
  ];

  var strip = document.getElementById("col-strip");
  if (!strip) return;

  var selectedCategory = null;
  var selectedDevice = null;

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function clearFrom() {
    while (strip.firstChild) strip.removeChild(strip.firstChild);
  }

  function makeColumn(headText) {
    var col = el("section", "browser-col");
    col.appendChild(el("div", "col-head", headText));
    return col;
  }

  function renderCategoryColumn() {
    var col = makeColumn("Categories");
    var list = el("ul", "col-rows");
    CATEGORIES.forEach(function (cat) {
      var li = document.createElement("li");
      var btn = el("button", "col-row", null);
      btn.type = "button";
      btn.setAttribute("aria-selected", cat === selectedCategory ? "true" : "false");
      var label = el("span", null, cat.name);
      var chev = el("span", "chev", "\u203a");
      chev.setAttribute("aria-hidden", "true");
      btn.appendChild(label);
      btn.appendChild(chev);
      btn.addEventListener("click", function () {
        selectedCategory = cat;
        selectedDevice = null;
        render();
      });
      li.appendChild(btn);
      list.appendChild(li);
    });
    col.appendChild(list);
    return col;
  }

  function renderDeviceColumn(cat) {
    var col = makeColumn(cat.name);
    var list = el("ul", "col-rows");
    if (cat.devices.length === 0) {
      var li = document.createElement("li");
      li.appendChild(el("div", "col-empty", "Nothing on the bench yet."));
      list.appendChild(li);
    } else {
      cat.devices.forEach(function (dev) {
        var li = document.createElement("li");
        var btn = el("button", "col-row", null);
        btn.type = "button";
        btn.setAttribute("aria-selected", dev === selectedDevice ? "true" : "false");
        var label = el("span", null, dev.name);
        var chev = el("span", "chev", "\u203a");
        chev.setAttribute("aria-hidden", "true");
        btn.appendChild(label);
        btn.appendChild(chev);
        btn.addEventListener("click", function () {
          selectedDevice = dev;
          render();
        });
        li.appendChild(btn);
        list.appendChild(li);
      });
    }
    col.appendChild(list);
    return col;
  }

  function renderPreviewColumn(dev) {
    var col = makeColumn("Preview");
    var pane = el("div", "col-preview");
    pane.appendChild(el("span", "preview-status", dev.status));
    pane.appendChild(el("h2", null, dev.title));
    pane.appendChild(el("p", null, dev.blurb));
    var facts = el("ul", "facts");
    dev.facts.forEach(function (f) {
      facts.appendChild(el("li", null, f));
    });
    pane.appendChild(facts);
    var link = el("a", "preview-link", "Read the full report \u2192");
    link.href = dev.url;
    pane.appendChild(link);
    col.appendChild(pane);
    return col;
  }

  function render() {
    clearFrom();
    strip.appendChild(renderCategoryColumn());
    if (selectedCategory) {
      strip.appendChild(renderDeviceColumn(selectedCategory));
      if (selectedDevice) {
        strip.appendChild(renderPreviewColumn(selectedDevice));
      }
    }
  }

  render();
})();
