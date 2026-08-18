(function () {
  var root = document.documentElement;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var saveData = !!(navigator.connection && navigator.connection.saveData);
  if (saveData) root.classList.add("save-data");
  if (reduce || saveData || !("IntersectionObserver" in window)) return;

  var nodes = document.querySelectorAll(".feature, .hero, .founding");
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) entry.target.classList.add("is-inview");
    });
  }, { threshold: 0.2 });
  nodes.forEach(function (node) { io.observe(node); });
})();
