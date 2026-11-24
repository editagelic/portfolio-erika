/* Erika Gelić portfolio — progressive enhancement only: a quiet reveal on scroll and arrow-key navigation between case studies. */
(function () {
  const root = document.documentElement;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!reduced && "IntersectionObserver" in window) {
    const targets = [...document.querySelectorAll(".pv, .other, .about, .contact, .cs-text, .pr-block, .fd, .cs-next")];
    root.classList.add("js");
    targets.forEach(el => el.classList.add("reveal"));
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.06, rootMargin: "0px 0px -40px 0px" });
    targets.forEach(el => io.observe(el));
    setTimeout(() => targets.forEach(el => el.classList.add("in")), 2500); /* never leave content hidden */
  }

  /* → opens the next case study */
  const next = document.querySelector(".cs-next a[rel=\"next\"]");
  if (next) addEventListener("keydown", e => {
    if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
    if (e.target.closest && e.target.closest("input, textarea, select, [contenteditable]")) return;
    if (e.key === "ArrowRight") location.href = next.href;
  });
})();
