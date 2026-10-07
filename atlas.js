/* BareBoard Atlas — Footprint x Openness interactive map.
 * No dependencies. Same-origin only. Satisfies script-src 'self' (no inline handlers).
 */
(function () {
  'use strict';

  /* ---------- data: [rank, name, category, units, confidence, openness, depth, source] ---------- */
  var DEVICES=[
[1,'Casio calculator line (1964–present)','Other',1800000000,'A',45,'none','Casio 60th-anniversary manufacturer release (via PR Newswire), 2025-04'],
[2,'Apple iPod line (2001–2022)','Other',300000000,'A',35,'none','Apple announcement (Tim Cook, via TechCrunch), 2011-10'],
[3,'Lenovo ThinkPad (entire line)','PCs & Single-Board',200000000,'A',75,'none','Lenovo StoryHub (30th anniversary post), 2022'],
[4,'Nokia 1100','Phones',250000000,'B',55,'none','Wikipedia citing Nokia-era press reports (250M milestone), 2008'],
[5,'Nokia 1110 / 1110i','Phones',250000000,'B',55,'none','Wikipedia citing press reports, not dated'],
[6,'HP DeskJet line (1988–present)','Printers',240000000,'B',40,'none','HP 20th-anniversary milestone reported by Engadget, 2008-02'],
[7,'iPhone 6 / 6 Plus','Phones',222400000,'B',15,'none','AppleInsider/analyst estimates via Wikipedia, not dated'],
[8,'PlayStation 2 (SCPH-30000 through 90000)','Game Consoles',160000000,'A',45,'none','Sony official PlayStation history page, 2024-11'],
[9,'Nintendo Switch (original, Lite, OLED)','Game Consoles',155900000,'A',30,'none','Nintendo FY2026 financial results (IR), 2026-05-08'],
[10,'Nintendo DS / DS Lite','Game Consoles',154000000,'A',55,'none','Nintendo IR lifetime hardware, 2016'],
[11,'Nokia 105 series (2013/2015 variants)','Phones',200000000,'B',50,'none','Wikipedia (List of best-selling mobile phones), not dated'],
[12,'HP LaserJet line (1984–present)','Printers',200000000,'B',40,'none','HP milestone reported by IT-Sp (company announcement), 2013-11'],
[13,'iPhone 6S / 6S Plus','Phones',174500000,'B',15,'none','analyst estimates via Wikipedia, not dated'],
[14,'iPhone 5s','Phones',165000000,'B',22,'none','Omdia via Visual Capitalist, 2023'],
[15,'Nokia 3210','Phones',161000000,'B',55,'none','Omdia via Visual Capitalist, 2023'],
[16,'iPhone 11 / 11 Pro / 11 Pro Max','Phones',159000000,'B',12,'none','Omdia via Visual Capitalist, 2023'],
[17,'Game Boy / Game Boy Color','Game Consoles',118700000,'A',70,'none','Nintendo IR lifetime hardware, 2016'],
[18,'iPhone 7 / 7 Plus','Phones',156700000,'B',22,'none','Wikipedia (List of best-selling mobile phones), not dated'],
[19,'PlayStation 4 (CUH-1000 through CUH-2200)','Game Consoles',117000000,'A',30,'none','Sony official PlayStation history page, 2024-11'],
[20,'iPhone XR / XS / XS Max','Phones',150700000,'B',12,'none','Wikipedia (List of best-selling mobile phones), not dated'],
[21,'Nokia 1200','Phones',150000000,'B',55,'none','Omdia via Visual Capitalist, 2023'],
[22,'Nokia 5230','Phones',150000000,'B',50,'none','Omdia via Visual Capitalist, 2023'],
[23,'PlayStation (PS1, SCPH-1000 through 9000)','Game Consoles',102000000,'A',60,'none','Sony official PlayStation history page, 2024-11'],
[24,'Nintendo Wii','Game Consoles',101600000,'A',60,'none','Nintendo IR lifetime hardware, 2016'],
[25,'Google Chromecast 2nd gen (2015)','Media Streamers',100000000,'A',20,'none','Google (official blog + hardware event, reported by 9to5Google / Android Headlines), 2024-08-06'],
[26,'Motorola RAZR V3','Phones',130000000,'B',45,'none','Wikipedia (List of best-selling mobile phones); best-selling flip phone ever, not dated'],
[27,'Nokia 3310 (3330)','Phones',126000000,'B',55,'none','Wikipedia (List of best-selling mobile phones), not dated'],
[28,'PlayStation 3 (CECHA through CECH-4300)','Game Consoles',87000000,'A',35,'none','Sony official PlayStation history page, 2016'],
[29,'Xbox 360 (Xenon through Corona)','Game Consoles',84000000,'A',35,'none','Microsoft E3 2014 announcement, 2014-06-09'],
[30,'Game Boy Advance','Game Consoles',81500000,'A',70,'none','Nintendo IR sales data, 2016-03'],
[31,'Nintendo 3DS','Game Consoles',75900000,'A',50,'none','Nintendo IR sales data, 2020-09'],
[32,'Raspberry Pi (all generations)','PCs & Single-Board',75000000,'A',95,'none','Raspberry Pi Holdings FY 2025 results (investegate.co.uk company announcement), 2026 (FY2025 results)'],
[33,'Nokia I-240G-A (Alcatel-Lucent GPON ONT)','Networking Gear',100000000,'B',25,'none','Nokia (Feb 2021, via GlobeNewswire/thefastmode): 100M fiber broadband shipments, 2021-02'],
[34,'iPhone 12 / 12 mini / 12 Pro / 12 Pro Max','Phones',100000000,'B',10,'none','Wikipedia (List of best-selling mobile phones), not dated'],
[35,'PlayStation 5 (CFI-1000 through CFI-2000)','Game Consoles',93600000,'B',20,'none','Sony earnings disclosure (via VideoCardz), 2026-05'],
[36,'Family Computer / Nintendo Entertainment System (NES)','Game Consoles',61900000,'A',65,'none','Nintendo IR sales data, 2016-03'],
[37,'Vizio TV line (2002–present)','TVs & Displays',82000000,'B',25,'none','Vizio IPO coverage (Nasdaq, Mar 2021), 2021-03'],
[38,'Tamagotchi line (1996–present)','Other',80000000,'B',40,'none','Bandai licensing material (via Total Licensing), 2023-01'],
[39,'Super Famicom / Super Nintendo (SNES)','Game Consoles',49100000,'A',65,'none','Nintendo IR sales data, 2016-03'],
[40,'Epson EcoTank line (2010–present; e.g. ET-2850)','Printers',60000000,'B',35,'none','Epson press release, 2021-11'],
[41,'iRobot home-robot line (2002–present)','Smart Home / IoT',40000000,'A',45,'none','iRobot company disclosure (via ZDNet, Amazon acquisition coverage), 2021-12'],
[42,'Samsung Galaxy A12','Phones',51800000,'B',20,'none','Omdia 4Q21 Smartphone Model Market Tracker (via SammyFans/Gizmochina), 2022-03'],
[43,'Nintendo 64','Game Consoles',32900000,'A',60,'none','Nintendo IR sales data, 2016-03'],
[44,'Linksys WRT54G (all revisions, incl. WRT54GL)','Networking Gear',31000000,'A',90,'none','Linksys Global Product Manager Vince La Duca, quoted in Digital Trends, 2016'],
[45,'Sega Genesis / Mega Drive','Game Consoles',30800000,'A',65,'none','Sega historical sales data, 2001'],
[46,'Samsung QLED TV line (2017–present)','TVs & Displays',40000000,'B',22,'none','Samsung Newsroom, citing Omdia, 2024-03-13'],
[47,'Nintendo Switch 2','Game Consoles',23700000,'A',15,'none','Nintendo FY2027 Q1 earnings, 2026-06-30'],
[48,'Raspberry Pi 3 range (3B / 3A+ / 3B+)','PCs & Single-Board',23000000,'A',95,'none','Tom\'s Hardware, citing CEO Eben Upton, Mar 2024'],
[49,'Hisense TV line (annual brand shipments)','TVs & Displays',29100000,'B',22,'none','Hisense company news (2024 global ranking announcement), 2025-01'],
[50,'TCL TV line (incl. Roku TV models)','TVs & Displays',29000000,'B',25,'none','TCL Industries 2024 annual report (tcl.com), 2024'],
[51,'Nintendo GameCube','Game Consoles',21700000,'A',55,'none','Nintendo IR sales data, 2016-03'],
[52,'Sonos connected-speaker line (Play:1 / One / Era)','Smart Home / IoT',19000000,'A',30,'none','Sonos S-1 SEC filing (as of March 31, 2018), summarized by RouteNote, 2018'],
[53,'ECOVACS DEEBOT line (2006–present)','Smart Home / IoT',25000000,'B',40,'none','ECOVACS company claim at launch event (via GadgetGuy), 2023-07'],
[54,'iPhone SE (2nd generation)','Phones',24200000,'B',12,'none','Wikipedia (List of best-selling mobile phones), not dated'],
[55,'Xbox Series X / Series S','Game Consoles',35200000,'C',18,'none','VGChartz estimate, 2026-07'],
[56,'Google Chromecast 1st gen (2013)','Media Streamers',17000000,'A',25,'none','Google (I/O 2015 keynote, reported by Engadget), 2015-05'],
[57,'Amazon eero (2nd gen, 2017)','Networking Gear',20000000,'B',20,'none','eero CEO Nick Weaver, eero 7 launch announcement (~2025, via stocktitan): \'tens of millions of eero devices\' across 24 countries, ~2025'],
[58,'Keurig brewer line (1998–present)','Other',20000000,'B',35,'none','Keurig sales history (Food Business News, Feb 2015), 2015-02'],
[59,'Hatchimals line (2016–present)','Other',14200000,'A',30,'none','Spin Master press release (PR Newswire), 2024-07'],
[60,'Nintendo Wii U','Game Consoles',13600000,'A',50,'none','Nintendo IR sales data, 2019-12'],
[61,'Canon SELPHY line (2004–present)','Printers',17000000,'B',35,'none','Canon 20th-anniversary announcement (via FinancialContent), 2024-04'],
[62,'Samsung Galaxy S21 / S21+ / S21 Ultra','Phones',13500000,'B',18,'none','Wikipedia (List of best-selling mobile phones), not dated'],
[63,'Arris TG1682G / Xfinity XB3 (xFi Wireless Gateway)','Networking Gear',10000000,'A',50,'full','Comcast via ibtimes.sg: \'over 10 million existing users of XB3 Gateway\' at the 2017 xFi platform launch, 2020 (citing 2017 launch)'],
[64,'Arduino Uno (ATmega328P boards)','PCs & Single-Board',10000000,'A',98,'none','CNX Software reporting Arduino\'s own announcement (UNO Mini Limited Edition launch), Nov 2021'],
[65,'Samsung Galaxy S22 Ultra','Phones',10900000,'B',18,'none','Wikipedia (List of best-selling mobile phones), not dated'],
[66,'magicJack line (2008–present)','Other',8000000,'A',30,'none','magicJack company press release (GlobeNewswire), 2012-03'],
[67,'LG OLED TV line (2013–present)','TVs & Displays',10000000,'B',22,'none','LG/Omdia milestone reported by Advanced Television, 2025-05'],
[68,'Sega Dreamcast','Game Consoles',9100000,'B',60,'none','IT History Society / Sega-era reporting, 2001'],
[69,'Google Home Mini (2017)','Smart Home / IoT',6400000,'A',25,'none','Google via Engadget, 2018-01-06'],
[70,'Tectoy Master System (Brazilian variants)','Game Consoles',8000000,'B',60,'none','Tectoy reporting, 2015'],
[71,'SodaStream soda-maker line (1903–present)','Other',8000000,'B',30,'none','Company-derived sales history (Motley Fool via Insider Monkey), 2013-02'],
[72,'Super Nintendo Classic Edition','Game Consoles',5300000,'A',45,'none','Nintendo IR sales data, 2019-03'],
[73,'PlayStation VR (2016)','Game Consoles',5000000,'A',30,'none','Sony announcement (Jim Ryan, via Road to VR), 2019-12'],
[74,'Ledger hardware-wallet line (2014–present)','Other',6000000,'B',40,'none','Ledger company disclosure (via TechCrunch), 2023-03'],
[75,'Chromebooks (global)','PCs & Single-Board',5800000,'B',55,'none','IDC via press reports, 2023'],
[76,'Raspberry Pi Pico','PCs & Single-Board',4000000,'A',97,'none','Tom\'s Hardware (quoting Eben Upton), 2024'],
[77,'GoPro Hero 5 Black','Cameras & Drones',4000000,'A',35,'none','GoPro press release \'HERO5 Black Is Best Selling GoPro, Ever\', Aug 2018'],
[78,'Nintendo Classic Mini: NES','Game Consoles',3600000,'A',45,'none','Nintendo IR sales data, 2019-03'],
[79,'Technics SL-1200 turntable line (1972–present)','Other',3500000,'A',50,'none','Panasonic/Technics 50th-anniversary release (via StockTitan), 2022-04'],
[80,'Apple Pencil (1st generation, 2015)','E-Readers & Tablets',4500000,'B',15,'none','KGI/Ming-Chi Kuo via AppleInsider, 2018-03'],
[81,'Chipolo tracker line (2013–present)','Smart Home / IoT',4500000,'B',35,'none','Chipolo company disclosure (via TechCrunch), 2025-04'],
[82,'Apple iPad 3rd generation (2012)','E-Readers & Tablets',3000000,'A',18,'none','Apple press release, 2012-03-19'],
[83,'Apple iPad 4th generation (2012)','E-Readers & Tablets',3000000,'A',18,'none','Apple press release, 2012-11-05'],
[84,'Parallax BASIC Stamp','PCs & Single-Board',3000000,'A',85,'none','Parallax (BASIC Stamp manual, 2nd ed.), 2004'],
[85,'Valve Steam Deck','Game Consoles',3700000,'B',80,'none','IDC estimate (by end-2024; Valve has not published an exact figure), 2025'],
[86,'Tectoy Mega Drive (Brazilian variants)','Game Consoles',3000000,'B',60,'none','Tectoy reporting, 2015'],
[87,'Ray-Ban Meta Smart Glasses','Wearables',2000000,'A',12,'none','EssilorLuxottica (Q4 2024 earnings call, Feb 2025), 2025-02'],
[88,'Whisker Litter-Robot line (2000–present)','Smart Home / IoT',2000000,'A',35,'none','Whisker press release (Business Wire), 2026-06'],
[89,'Wyze Cam v2 (2018)','Smart Home / IoT',1500000,'A',55,'none','Wyze Labs via Pulse2 / GeekWire funding coverage, 2019-02-06'],
[90,'BBC micro:bit','PCs & Single-Board',2000000,'B',95,'none','Science Museum Group, 2026'],
[91,'Husqvarna Automower line (1995–present)','Smart Home / IoT',2000000,'B',35,'none','Husqvarna press coverage (Landscape & Amenity), 2021-06'],
[92,'Meta Quest 3 / Quest 3S','Game Consoles',1700000,'B',25,'none','industry reporting (over 1.7M), 2025'],
[93,'Sega Genesis Mini / Mega Drive Mini','Game Consoles',1500000,'B',45,'none','Sega reporting (over 1.5M), 2023'],
[94,'reMarkable 2 (2020)','E-Readers & Tablets',1000000,'A',70,'none','reMarkable company announcement via Wikipedia, 2022-05-10'],
[95,'Xfinity xFi Pods (2nd gen)','Networking Gear',1000000,'A',20,'none','Comcast 2021 WiFi Trends Report (via BusinessWire, 2022-02-16): \'more than one million xFi pods\' purchased by Xfinity Internet customers \'over the last 3 years\', 2022-02-16'],
[96,'Flipper Zero (2020–present)','Other',1000000,'A',90,'none','Flipper Devices company statement (via IMP News), 2026-05'],
[97,'Tractive GPS tracker line (2013–present)','Smart Home / IoT',1000000,'A',30,'none','Tractive company website (product page), 2026-05'],
[98,'Sky Q (2016)','Media Streamers',1000000,'B',20,'none','Sky via AVForums/informitv, 2017-01/2017-07'],
[99,'Nex Playground','Game Consoles',1000000,'B',25,'none','Nex announcement, 2025'],
[100,'Ring Video Doorbell (2nd Gen, 2020)','Smart Home / IoT',359000,'A',20,'none','U.S. CPSC recall notice (Nov 2020), reported by Digital Trends, Nov 2020']];

  /* 12-category muted palette */
  var COLORS = {
    'Phones': '#5b8fc9',
    'Game Consoles': '#d9735f',
    'Smart Home / IoT': '#7fb069',
    'PCs & Single-Board': '#dfa54e',
    'Networking Gear': '#9b8bd4',
    'TVs & Displays': '#4fb0b0',
    'Media Streamers': '#d484b8',
    'Printers': '#a98a5e',
    'E-Readers & Tablets': '#7587b0',
    'Other': '#9aa0a6',
    'Cameras & Drones': '#c25e7e',
    'Wearables': '#4a6fa5'
  };
  var CATEGORY_ORDER = Object.keys(COLORS);

  var XB3_REPORT = '/autopsy/xb3-tg1682g/';
  var HOT100 = '/hot-100.html';

  /* ---------- geometry ---------- */
  var W = 1000, H = 600;
  var M = { l: 64, r: 28, t: 40, b: 56 };
  var X_MIN = 5.3, X_MAX = 9.5;          // log10(units)
  var Y_MIN = -6, Y_MAX = 106;           // openness
  var QX = 7, QY = 50;                   // quadrant dividers (10M units, openness 50)

  function xPix(logu) { return M.l + (logu - X_MIN) / (X_MAX - X_MIN) * (W - M.l - M.r); }
  function yPix(o) { return (H - M.b) - (o - Y_MIN) / (Y_MAX - Y_MIN) * (H - M.t - M.b); }

  function fmtUnits(u) {
    if (u >= 1e9) return (u / 1e9).toFixed(2).replace(/\.?0+$/, '') + 'B';
    if (u >= 1e6) return (u / 1e6).toFixed(1).replace(/\.0$/, '') + 'M';
    return Math.round(u / 1e3) + 'K';
  }

  var NS = 'http://www.w3.org/2000/svg';
  function el(tag, attrs, parent) {
    var e = document.createElementNS(NS, tag);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }
  function txt(parent, tag, str, attrs) {
    var e = el(tag, attrs || {}, parent);
    e.textContent = str;
    return e;
  }

  /* ---------- state ---------- */
  var activeCats = {};
  CATEGORY_ORDER.forEach(function (c) { activeCats[c] = true; });
  var query = '';

  /* ---------- build ---------- */
  function init() {
    var wrap = document.getElementById('atlas-chartwrap');
    var mount = document.getElementById('atlas-chart');
    if (!wrap || !mount) return;

    var svg = el('svg', {
      viewBox: '0 0 ' + W + ' ' + H,
      'class': 'atlas-chart',
      role: 'img',
      'aria-label': 'Scatter plot of 100 devices: horizontal axis units sold (logarithmic), vertical axis BareBoard openness rating 0 to 100.'
    }, mount);

    /* defs: clip */
    var defs = el('defs', {}, svg);
    var clip = el('clipPath', { id: 'atlas-clip' }, defs);
    el('rect', { x: M.l, y: M.t, width: W - M.l - M.r, height: H - M.t - M.b }, clip);

    /* static layer: grid, axes, quadrant labels */
    var base = el('g', {}, svg);

    [6, 7, 8, 9].forEach(function (t) {
      var x = xPix(t);
      el('line', { x1: x, y1: M.t, x2: x, y2: H - M.b, 'class': 'grid-line' }, base);
      txt(base, 'text', t === 6 ? '1M' : t === 7 ? '10M' : t === 8 ? '100M' : '1B',
        { x: x, y: H - M.b + 22, 'text-anchor': 'middle', 'class': 'tick-label' });
    });
    [0, 20, 40, 60, 80, 100].forEach(function (t) {
      var y = yPix(t);
      el('line', { x1: M.l, y1: y, x2: W - M.r, y2: y, 'class': 'grid-line' }, base);
      txt(base, 'text', String(t), { x: M.l - 10, y: y + 4, 'text-anchor': 'end', 'class': 'tick-label' });
    });
    txt(base, 'text', 'UNITS SOLD  \u2014  LOG SCALE',
      { x: (M.l + W - M.r) / 2, y: H - 12, 'text-anchor': 'middle', 'class': 'axis-label' });
    var yl = txt(base, 'text', 'OPENNESS  \u2014  BAREBOARD RATING 0\u2013100',
      { x: 18, y: (M.t + H - M.b) / 2, 'text-anchor': 'middle', 'class': 'axis-label' });
    yl.setAttribute('transform', 'rotate(-90 18 ' + ((M.t + H - M.b) / 2) + ')');

    /* quadrant dividers + labels */
    el('line', { x1: xPix(QX), y1: M.t, x2: xPix(QX), y2: H - M.b, 'class': 'quad-divider' }, base);
    el('line', { x1: M.l, y1: yPix(QY), x2: W - M.r, y2: yPix(QY), 'class': 'quad-divider' }, base);
    var qx1 = (M.l + xPix(QX)) / 2, qx2 = (xPix(QX) + W - M.r) / 2;
    txt(base, 'text', 'Hidden gems', { x: qx1, y: M.t + 22, 'text-anchor': 'middle', 'class': 'quad-label' });
    txt(base, 'text', 'Start here', { x: qx2, y: M.t + 22, 'text-anchor': 'middle', 'class': 'quad-label' });
    txt(base, 'text', 'Obscure', { x: qx1, y: H - M.b - 12, 'text-anchor': 'middle', 'class': 'quad-label' });
    txt(base, 'text', 'Black boxes', { x: qx2, y: H - M.b - 12, 'text-anchor': 'middle', 'class': 'quad-label' });

    /* zoomable viewport */
    var view = el('g', { 'clip-path': 'url(#atlas-clip)' }, svg);
    var bubblesG = el('g', {}, view);

    var circles = DEVICES.map(function (d) {
      var logu = Math.log10(d[3]);
      var c = el('circle', {
        cx: xPix(logu).toFixed(1),
        cy: yPix(d[5]).toFixed(1),
        r: d[6] === 'full' ? 13 : 6,
        fill: COLORS[d[2]] || '#9aa0a6',
        'fill-opacity': d[6] === 'full' ? 0.92 : 0.78,
        'class': 'bubble',
        tabindex: '0',
        role: 'button',
        'aria-label': d[1] + ', ' + d[2] + ', ' + fmtUnits(d[3]) + ' units, openness ' + d[5] + ' of 100'
      }, bubblesG);
      c._d = d;
      return c;
    });

    /* ---------- tooltip ---------- */
    var tip = document.getElementById('atlas-tip');
    var tipTitle = tip.querySelector('h3');
    var tipCat = tip.querySelector('.tip-cat');
    var tipRank = tip.querySelector('[data-f="rank"]');
    var tipUnits = tip.querySelector('[data-f="units"]');
    var tipOpen = tip.querySelector('[data-f="open"]');
    var tipMeter = tip.querySelector('.open-meter span');
    var tipSrc = tip.querySelector('.src');
    var tipLink = tip.querySelector('.tip-link');
    var pinned = null;

    function showTip(d, anchorX, anchorY) {
      tipTitle.textContent = d[1];
      tipCat.innerHTML = '';
      var dot = document.createElement('span');
      dot.className = 'dot';
      dot.style.background = COLORS[d[2]] || '#9aa0a6';
      tipCat.appendChild(dot);
      tipCat.appendChild(document.createTextNode(d[2]));
      tipRank.textContent = 'Hot 100 #' + d[0];
      tipUnits.textContent = fmtUnits(d[3]) + ' units \u00B7 confidence ' + d[4];
      tipOpen.textContent = d[5] + ' / 100 (editorial v1)';
      tipMeter.style.width = d[5] + '%';
      tipSrc.textContent = 'Source: ' + d[7];
      var isXb3 = d[6] === 'full';
      tipLink.setAttribute('href', isXb3 ? XB3_REPORT : HOT100);
      tipLink.textContent = isXb3 ? 'Read the full teardown \u2192' : 'See it in the Hot 100 \u2192';
      tip.classList.add('open');
      /* position near anchor, clamped inside wrap */
      var wr = wrap.getBoundingClientRect();
      var tw = 304, th = 260;
      var lx = Math.min(Math.max(8, anchorX + 16), wr.width - tw - 8);
      var ly = Math.min(Math.max(8, anchorY - th / 2), wr.height - th - 8);
      if (window.innerWidth <= 640) { lx = 16; ly = NaN; } /* CSS bottom-sheet takes over */
      tip.style.left = lx + 'px';
      if (!isNaN(ly)) tip.style.top = ly + 'px'; else tip.style.top = '';
    }
    function hideTip() {
      if (!pinned) tip.classList.remove('open');
    }
    tip.querySelector('.tip-close').addEventListener('click', function () {
      pinned = null;
      tip.classList.remove('open');
    });

    function bubbleXY(c) {
      var pt = svg.createSVGPoint();
      pt.x = parseFloat(c.getAttribute('cx'));
      pt.y = parseFloat(c.getAttribute('cy'));
      var m = c.getCTM();
      if (m) pt = pt.matrixTransform(m);
      var r = svg.getBoundingClientRect();
      var wr = wrap.getBoundingClientRect();
      return { x: r.left - wr.left + pt.x * (r.width / W), y: r.top - wr.top + pt.y * (r.height / H) };
    }

    circles.forEach(function (c) {
      var d = c._d;
      c.addEventListener('mouseenter', function () {
        var p = bubbleXY(c);
        showTip(d, p.x, p.y);
      });
      c.addEventListener('mouseleave', hideTip);
      c.addEventListener('focus', function () {
        var p = bubbleXY(c);
        showTip(d, p.x, p.y);
      });
      c.addEventListener('blur', hideTip);
      c.addEventListener('click', function (ev) {
        ev.stopPropagation();
        var p = bubbleXY(c);
        pinned = d;
        showTip(d, p.x, p.y);
      });
      c.addEventListener('keydown', function (ev) {
        if (ev.key === 'Enter' || ev.key === ' ') {
          ev.preventDefault();
          var p = bubbleXY(c);
          pinned = d;
          showTip(d, p.x, p.y);
        } else if (ev.key === 'Escape') {
          pinned = null;
          tip.classList.remove('open');
          c.blur();
        }
      });
    });
    svg.addEventListener('click', function () {
      pinned = null;
      tip.classList.remove('open');
    });
    document.addEventListener('keydown', function (ev) {
      if (ev.key === 'Escape') { pinned = null; tip.classList.remove('open'); }
    });

    /* ---------- pan & zoom ---------- */
    var t = { k: 1, x: 0, y: 0 };
    function applyT() {
      view.setAttribute('transform', 'translate(' + t.x + ',' + t.y + ') scale(' + t.k + ')');
    }
    function zoomAt(svgX, svgY, factor) {
      var k2 = Math.min(6, Math.max(1, t.k * factor));
      var f = k2 / t.k;
      t.x = svgX - (svgX - t.x) * f;
      t.y = svgY - (svgY - t.y) * f;
      t.k = k2;
      if (t.k === 1) { t.x = 0; t.y = 0; }
      applyT();
    }
    function toSvg(ev) {
      var r = svg.getBoundingClientRect();
      return { x: (ev.clientX - r.left) * (W / r.width), y: (ev.clientY - r.top) * (H / r.height) };
    }
    svg.addEventListener('wheel', function (ev) {
      ev.preventDefault();
      var p = toSvg(ev);
      zoomAt(p.x, p.y, ev.deltaY < 0 ? 1.15 : 1 / 1.15);
    }, { passive: false });

    var pointers = new Map();
    var pinchD0 = 0, pinchK0 = 1, pinchCx0 = 0, pinchCy0 = 0;
    var dragMoved = false;
    function svgRect() { return svg.getBoundingClientRect(); }
    svg.addEventListener('pointerdown', function (ev) {
      pointers.set(ev.pointerId, { x: ev.clientX, y: ev.clientY });
      dragMoved = false;
      if (pointers.size === 2) {
        var pts = Array.from(pointers.values());
        pinchD0 = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
        pinchK0 = t.k;
        var r = svgRect();
        pinchCx0 = ((pts[0].x + pts[1].x) / 2 - r.left) * (W / r.width);
        pinchCy0 = ((pts[0].y + pts[1].y) / 2 - r.top) * (H / r.height);
      }
    });
    window.addEventListener('pointermove', function (ev) {
      if (!pointers.has(ev.pointerId)) return;
      var prev = pointers.get(ev.pointerId);
      var dx = ev.clientX - prev.x, dy = ev.clientY - prev.y;
      pointers.set(ev.pointerId, { x: ev.clientX, y: ev.clientY });
      var r = svgRect();
      var sx = W / r.width, sy = H / r.height;
      if (pointers.size === 1) {
        if (Math.abs(dx) + Math.abs(dy) > 2) dragMoved = true;
        if (t.k > 1 && dragMoved) {
          t.x += dx * sx;
          t.y += dy * sy;
          applyT();
        }
      } else if (pointers.size === 2) {
        var pts = Array.from(pointers.values());
        var d = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
        if (pinchD0 > 0 && d > 0) {
          var k2 = Math.min(6, Math.max(1, pinchK0 * d / pinchD0));
          var f = k2 / t.k;
          t.x = pinchCx0 - (pinchCx0 - t.x) * f;
          t.y = pinchCy0 - (pinchCy0 - t.y) * f;
          t.k = k2;
          applyT();
        }
        dragMoved = true;
      }
    });
    ['pointerup', 'pointercancel'].forEach(function (evt) {
      window.addEventListener(evt, function (ev) { pointers.delete(ev.pointerId); });
    });
    /* suppress click-through after drag */
    svg.addEventListener('click', function (ev) {
      if (dragMoved) { ev.stopPropagation(); dragMoved = false; }
    }, true);

    /* ---------- filters ---------- */
    var chipsBox = document.getElementById('atlas-chips');
    var countEl = document.getElementById('atlas-count');
    CATEGORY_ORDER.forEach(function (c) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'atlas-chip';
      b.setAttribute('aria-pressed', 'true');
      var dot = document.createElement('span');
      dot.className = 'dot';
      dot.style.background = COLORS[c];
      b.appendChild(dot);
      b.appendChild(document.createTextNode(c));
      b.addEventListener('click', function () {
        activeCats[c] = !activeCats[c];
        b.setAttribute('aria-pressed', String(activeCats[c]));
        applyFilters();
      });
      chipsBox.appendChild(b);
    });

    function matches(d) {
      if (!activeCats[d[2]]) return false;
      if (query && d[1].toLowerCase().indexOf(query) === -1) return false;
      return true;
    }
    function applyFilters() {
      var n = 0;
      circles.forEach(function (c) {
        var catOn = activeCats[c._d[2]];
        var nameOk = !query || c._d[1].toLowerCase().indexOf(query) !== -1;
        var ok = catOn && nameOk;
        c.classList.toggle('dim', catOn && !nameOk);
        c.classList.toggle('hidden-cat', !catOn);
        if (ok) n++;
      });
      countEl.textContent = n + ' of 100 devices shown';
      buildTable();
    }

    var search = document.getElementById('atlas-search');
    search.addEventListener('input', function () {
      query = search.value.trim().toLowerCase();
      applyFilters();
    });

    document.getElementById('atlas-reset').addEventListener('click', function () {
      query = '';
      search.value = '';
      CATEGORY_ORDER.forEach(function (c) { activeCats[c] = true; });
      chipsBox.querySelectorAll('.atlas-chip').forEach(function (b) {
        b.setAttribute('aria-pressed', 'true');
      });
      t = { k: 1, x: 0, y: 0 };
      applyT();
      pinned = null;
      tip.classList.remove('open');
      applyFilters();
    });

    /* ---------- list fallback (sortable table) ---------- */
    var sortKey = 'rank', sortDir = 1;
    var tableWrap = document.getElementById('atlas-tablewrap');
    function buildTable() {
      var rows = DEVICES.filter(matches).slice();
      rows.sort(function (a, b) {
        var va = sortKey === 'name' ? a[1].toLowerCase() : sortKey === 'cat' ? a[2] : sortKey === 'open' ? a[5] : sortKey === 'units' ? a[3] : a[0];
        var vb = sortKey === 'name' ? b[1].toLowerCase() : sortKey === 'cat' ? b[2] : sortKey === 'open' ? b[5] : sortKey === 'units' ? b[3] : b[0];
        return (va < vb ? -1 : va > vb ? 1 : 0) * sortDir;
      });
      tableWrap.innerHTML = '';
      var table = document.createElement('table');
      table.className = 'atlas-table';
      var thead = document.createElement('thead');
      var hr = document.createElement('tr');
      [['#', 'rank'], ['Device', 'name'], ['Category', 'cat'], ['Units', 'units'], ['Openness', 'open']].forEach(function (col) {
        var th = document.createElement('th');
        th.textContent = col[0] + (sortKey === col[1] ? (sortDir === 1 ? ' \u25B2' : ' \u25BC') : '');
        th.setAttribute('scope', 'col');
        th.tabIndex = 0;
        th.setAttribute('role', 'button');
        th.setAttribute('aria-label', 'Sort by ' + col[0]);
        (function (k) {
          function go() {
            if (sortKey === k) sortDir *= -1; else { sortKey = k; sortDir = 1; }
            buildTable();
          }
          th.addEventListener('click', go);
          th.addEventListener('keydown', function (ev) {
            if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); go(); }
          });
        })(col[1]);
        hr.appendChild(th);
      });
      thead.appendChild(hr);
      table.appendChild(thead);
      var tb = document.createElement('tbody');
      rows.forEach(function (d) {
        var tr = document.createElement('tr');
        [['#' + d[0], 0], [d[1], 0], [d[2], 0], [fmtUnits(d[3]), 1], [d[5] + '/100', 1]].forEach(function (cell) {
          var td = document.createElement('td');
          td.textContent = cell[0];
          if (cell[1]) td.className = 'num';
          tr.appendChild(td);
        });
        tb.appendChild(tr);
      });
      table.appendChild(tb);
      tableWrap.appendChild(table);
    }

    var listToggle = document.getElementById('atlas-list-toggle');
    var chartSec = document.getElementById('atlas-chartsection');
    var listShowing = false;
    listToggle.addEventListener('click', function () {
      listShowing = !listShowing;
      tableWrap.style.display = listShowing ? 'block' : 'none';
      chartSec.style.display = listShowing ? 'none' : 'block';
      listToggle.textContent = listShowing ? 'View as chart' : 'View as list';
      if (listShowing) buildTable();
    });

    applyFilters();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
