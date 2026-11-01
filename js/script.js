(function () {
  "use strict";

  // Mobile menu: a drawer that slides in from the right over a dimmed backdrop
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  var backdrop = document.querySelector(".nav-backdrop");

  function setMenu(open) {
    nav.classList.toggle("open", open);
    backdrop.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.classList.toggle("nav-open", open);
  }

  toggle.addEventListener("click", function () {
    setMenu(!nav.classList.contains("open"));
  });
  backdrop.addEventListener("click", function () { setMenu(false); });
  nav.addEventListener("click", function (e) {
    if (e.target.closest("a")) setMenu(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav.classList.contains("open")) {
      setMenu(false);
      toggle.focus();
    }
  });

  // Hero and about images: if the file is not there yet, show a plain
  // placeholder instead of a broken image icon
  document.querySelectorAll(".img-frame img").forEach(function (img) {
    var frame = img.closest(".img-frame");
    function missing() { frame.classList.add("missing"); }
    if (img.complete && img.naturalWidth === 0) missing();
    img.addEventListener("error", missing);
  });

  // Documentation: expand or collapse every topic
  var topics = document.querySelectorAll(".docs details");
  var all = document.getElementById("toggle-docs");
  all.addEventListener("click", function () {
    var open = all.textContent === "Expand all";
    topics.forEach(function (d) { d.open = open; });
    all.textContent = open ? "Collapse all" : "Expand all";
  });

  // Opening a doc link directly (e.g. a shared #doc-schedule URL) expands that topic
  function openTopic(id) {
    var d = id && document.getElementById(id);
    if (d && d.tagName === "DETAILS") d.open = true;
  }
  openTopic(location.hash.slice(1));
  window.addEventListener("hashchange", function () { openTopic(location.hash.slice(1)); });

  // Gentle reveal on scroll (content stays visible if this cannot run)
  var items = document.querySelectorAll(".reveal");
  var calm = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if ("IntersectionObserver" in window && !calm) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("in"); });
  }

  // Footer year
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- parallax "window": hero & about circles/blobs stay put
     while their section scrolls past, like looking through a window.
     Each section clips its own shapes via overflow: hidden, so pinning
     every shape to the same viewport offset (window.scrollY) is enough —
     a shape only stays visible for as long as its section's box still
     covers that spot on screen. ---------- */
  var pinned = document.querySelectorAll(
    ".hero .blob, .hero .circle-accent, " +
    "#about .blob, #about .circle-accent, " +
    ".site-footer .blob, .site-footer .circle-accent"
  );
  if (pinned.length && !calm) {
    var pinTicking = false;
    function pinUpdate() {
      var px = window.scrollY + "px";
      pinned.forEach(function (el) { el.style.setProperty("--pz", px); });
      pinTicking = false;
    }
    window.addEventListener("scroll", function () {
      if (!pinTicking) {
        requestAnimationFrame(pinUpdate);
        pinTicking = true;
      }
    }, { passive: true });
    pinUpdate();
  }
})();