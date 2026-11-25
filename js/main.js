const header = document.querySelector("#header");
const toggle = document.querySelector(".nav-toggle");
const menu = document.querySelector("#menu");
const progress = document.querySelector(".progress");
const year = document.querySelector("#yil");

if (year) year.textContent = String(new Date().getFullYear());

toggle?.addEventListener("click", () => {
  const open = menu.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", open ? "true" : "false");
  toggle.setAttribute("aria-label", open ? "Menüyü kapat" : "Menüyü aç");
});

menu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menu.classList.remove("is-open");
    toggle?.setAttribute("aria-expanded", "false");
    toggle?.setAttribute("aria-label", "Menüyü aç");
  });
});

const dock = document.querySelector(".dock");

const onScroll = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 8);
  dock?.classList.toggle("is-on", window.scrollY > 280);
  const height = document.documentElement.scrollHeight - window.innerHeight;
  if (progress && height > 0) {
    progress.style.width = `${(window.scrollY / height) * 100}%`;
  }
};

window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

const motionOk = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
document.querySelectorAll(".reveal").forEach((el) => {
  if (!motionOk) {
    el.classList.add("is-in");
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
  );
  observer.observe(el);
});

