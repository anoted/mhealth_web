const SITE_VERSION = "20260723";

const NAV_ITEMS = [
  ["Home", "index.html"],
  ["Book", "book.html"],
  ["Publications", "publications.html"],
  ["Repositories", "repositories.html"],
  ["People", "people.html"],
  ["Workshop", "workshop.html"],
  ["Conference", "conference.html"]
];

const withVersion = (path) => `${path}?v=${SITE_VERSION}`;
const currentPage = window.location.pathname.split("/").pop() || "index.html";

const header = document.querySelector("#site-header");
if (header) {
  header.innerHTML = `
    <div class="nav-wrap">
      <a class="brand" href="${withVersion("index.html")}" aria-label="mHealth Security home">
        <span class="brand-mark" aria-hidden="true">
          <svg viewBox="0 0 44 44"><rect width="44" height="44"></rect><path d="M7 23h7l3-7 6 16 4-11 3 5h7"></path></svg>
        </span>
        <span>mHealth <b>Security</b></span>
      </a>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-nav">
        <span></span><span></span><span></span><span class="sr-only">Toggle navigation</span>
      </button>
      <nav id="primary-nav" class="primary-nav" aria-label="Primary navigation">
        ${NAV_ITEMS.map(([label, href]) => `
          <a href="${withVersion(href)}" ${currentPage === href ? 'class="active" aria-current="page"' : ""}>${label}</a>
        `).join("")}
      </nav>
    </div>`;

  const toggle = header.querySelector(".menu-toggle");
  const nav = header.querySelector(".primary-nav");
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    nav.classList.toggle("open", !open);
    document.body.classList.toggle("menu-open", !open);
  });

  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    toggle.setAttribute("aria-expanded", "false");
    nav.classList.remove("open");
    document.body.classList.remove("menu-open");
  }));
}

document.querySelectorAll("[data-version-link]").forEach((link) => {
  const base = link.getAttribute("href").split("?")[0];
  link.setAttribute("href", withVersion(base));
});

const footer = document.querySelector("#site-footer");
if (footer) {
  footer.innerHTML = `
    <div class="footer-inner">
      <div>
        <a class="footer-brand" href="${withVersion("index.html")}">mHealth Security</a>
        <p>Research in wireless systems, physical-layer security, and connected health.</p>
      </div>
      <div class="footer-meta">
        <span>NSF Award #2428595</span>
        <span>Site version ${SITE_VERSION}</span>
      </div>
    </div>`;
}

const revealObserver = "IntersectionObserver" in window
  ? new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 })
  : null;

document.querySelectorAll(".reveal").forEach((element) => {
  if (revealObserver) revealObserver.observe(element);
  else element.classList.add("visible");
});
