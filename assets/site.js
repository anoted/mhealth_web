const SITE_VERSION = "20260928";

const NAV_ITEMS = [
  ["Home", "index.html"],
  ["Book", "book.html"],
  ["Publications", "publications.html"],
  ["Repositories", "repositories.html"],
  ["People", "people.html"],
  ["Workshop", "workshop.html"],
  ["Conference", "conference.html"]
];

const currentPage = window.location.pathname.split("/").pop() || "index.html";

const header = document.querySelector("#site-header");
// The nav is written into each page's HTML so crawlers see the links; only build it if missing.
if (header && !header.querySelector(".nav-wrap")) {
  header.innerHTML = `
    <div class="nav-wrap">
      <a class="brand" href="index.html" aria-label="mHealth Security home">
        <span class="brand-mark" aria-hidden="true">
          <svg viewBox="0 0 44 44"><path d="M22 3 38 9V21c0 10.2-6.7 17.6-16 20.6C12.7 38.6 6 31.2 6 21V9Z" fill="#14305a"/><path d="M11 23h6.2l2.7-6.8 4.4 12.6 2.9-8.4 2 2.6H35" fill="none" stroke="#f0b43c" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </span>
        <span class="brand-text">
          <span class="brand-name">mHealth Security</span>
          <span class="brand-sub">Yeshiva University</span>
        </span>
      </a>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-nav">
        <span></span><span></span><span></span><span class="sr-only">Toggle navigation</span>
      </button>
      <nav id="primary-nav" class="primary-nav" aria-label="Primary navigation">
        ${NAV_ITEMS.map(([label, href]) => `
          <a href="${href}" ${currentPage === href ? 'class="active" aria-current="page"' : ""}>${label}</a>
        `).join("")}
      </nav>
    </div>`;
}

if (header) {
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

const footer = document.querySelector("#site-footer");
if (footer) {
  footer.innerHTML = `
    <div class="footer-inner">
      <div>
        <a class="footer-brand" href="index.html">mHealth Security</a>
        <p>Research in wireless systems, physical-layer security, and connected health.</p>
      </div>
      <div class="footer-meta">
        <span>Site version ${SITE_VERSION}</span>
      </div>
    </div>`;
}
