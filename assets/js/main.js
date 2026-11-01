(function () {
  var root = document.documentElement;

  // theme toggle (persisted when storage is available)
  var saved = null;
  try { saved = localStorage.getItem("theme"); } catch (e) {}
  if (saved) root.setAttribute("data-theme", saved);

  var themeBtn = document.getElementById("theme-btn");
  function isDark() {
    var t = root.getAttribute("data-theme");
    return t ? t === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  function paint() { if (themeBtn) themeBtn.textContent = isDark() ? "☀" : "☾"; }
  paint();
  if (themeBtn) themeBtn.addEventListener("click", function () {
    var next = isDark() ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
    paint();
  });

  // mobile menu
  var menuBtn = document.getElementById("menu-btn");
  var list = document.getElementById("nav-list");
  if (menuBtn && list) menuBtn.addEventListener("click", function () {
    var open = list.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", open);
  });

  // project filter
  var buttons = document.querySelectorAll(".filter button");
  buttons.forEach(function (b) {
    b.addEventListener("click", function () {
      buttons.forEach(function (x) { x.setAttribute("aria-pressed", x === b); });
      var f = b.dataset.filter;
      document.querySelectorAll("[data-cat]").forEach(function (c) {
        c.style.display = f === "all" || c.dataset.cat.split(" ").indexOf(f) > -1 ? "" : "none";
      });
    });
  });

  // reveal on scroll
  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.08 });
    items.forEach(function (i) { io.observe(i); });
  } else {
    items.forEach(function (i) { i.classList.add("in"); });
  }
})();
