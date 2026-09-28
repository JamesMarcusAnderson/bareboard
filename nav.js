// Devices folder: point the category submenu where there's room.
// Default flies out to the side, expanding down; near the bottom of the
// viewport it flips to expand up instead. No animation delays.
document.querySelectorAll('.cat-item').forEach(function (item) {
  var sub = item.querySelector('.cat-sub');
  if (!sub) return;
  item.addEventListener('mouseenter', function () {
    requestAnimationFrame(function () {
      var r = item.getBoundingClientRect();
      var h = sub.offsetHeight || 60;
      var roomBelow = window.innerHeight - r.top;
      sub.classList.toggle('flip-up', roomBelow < h + 16);
    });
  });
});
