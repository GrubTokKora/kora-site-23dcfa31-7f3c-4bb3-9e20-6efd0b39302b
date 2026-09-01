const ICON_MENU = '<svg class="icon icon-lg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/></svg>';
const ICON_CLOSE = '<svg class="icon icon-lg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"/></svg>';
const ICON_PHONE = '<svg class="icon icon-sm" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/></svg>';
const ICON_PIN = '<svg class="icon icon-sm" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/></svg>';
const ICON_MAIL = '<svg class="icon icon-sm" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/></svg>';

const PSYCHOLOGY_TODAY = 'https://www.psychologytoday.com/profile/930087';
const MAP_URL = 'https://maps.app.goo.gl/sR7ZJt2eWfuPXxVH9';
const PHONE_HREF = 'tel:+18602666358';
const PHONE_DISPLAY = '(860) 266-6358';
const EMAIL_HREF = 'mailto:admin@rztherapysolutions.com';
const EMAIL_DISPLAY = 'admin@rztherapysolutions.com';

const HEADER_HTML = `
<header class="site-header">
  <div class="top-bar py-2 px-4 hidden md:block">
    <div class="max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap">
      <a href="${PHONE_HREF}" class="inline-flex items-center gap-2">
        ${ICON_PHONE}
        ${PHONE_DISPLAY}
      </a>
      <a href="${EMAIL_HREF}" class="inline-flex items-center gap-2">
        ${ICON_MAIL}
        ${EMAIL_DISPLAY}
      </a>
      <a href="${MAP_URL}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2">
        ${ICON_PIN}
        79A Norwich Ave, Colchester, CT
      </a>
    </div>
  </div>

  <nav id="navbar" class="navbar" aria-label="Main navigation">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="navbar-inner flex justify-between items-center">
        <a href="index.html" class="flex items-center" aria-label="RZ Therapy Solutions Home">
          <img src="https://quseprdus1.blob.core.windows.net/kora-business-images/user-media/23dcfa31-7f3c-4bb3-9e20-6efd0b39302b/de8c94d8-887e-4625-825f-ec262dbc28df/1785749217_ldwv6t.png" alt="RZ Therapy Solutions" class="header-logo" width="200" height="50" loading="eager" decoding="async">
        </a>

        <div class="hidden lg:flex items-center gap-1">
          <a href="index.html" data-nav="home" class="nav-link px-3 py-2">Home</a>
          <a href="about-us.html" data-nav="about" class="nav-link px-3 py-2">About Us</a>
          <a href="information.html" data-nav="information" class="nav-link px-3 py-2">Information</a>
          <a href="who-we-help.html" data-nav="who-we-help" class="nav-link px-3 py-2">Who We Help</a>
          <a href="blog.html" data-nav="blog" class="nav-link px-3 py-2">Blog</a>
          <a href="contact.html" data-nav="contact" class="nav-link px-3 py-2">Contact</a>
          <a href="${PHONE_HREF}" class="btn-accent nav-cta ml-3">${PHONE_DISPLAY}</a>
        </div>

        <button id="mobile-menu-btn" class="lg:hidden text-brand-primary p-2" aria-label="Open menu" type="button">
          ${ICON_MENU}
        </button>
      </div>
    </div>
  </nav>

  <div id="mobile-menu" class="mobile-menu fixed top-0 right-0 w-80 h-full bg-white lg:hidden">
    <div class="p-6">
      <button id="close-menu-btn" class="absolute top-6 right-6 text-brand-primary" aria-label="Close menu" type="button">
        ${ICON_CLOSE}
      </button>
      <div class="mt-16 space-y-1">
        <a href="index.html" data-nav="home" class="block px-4 py-3 text-lg text-brand-dark">Home</a>
        <a href="about-us.html" data-nav="about" class="block px-4 py-3 text-lg text-brand-dark">About Us</a>
        <a href="information.html" data-nav="information" class="block px-4 py-3 text-lg text-brand-dark">Information</a>
        <a href="who-we-help.html" data-nav="who-we-help" class="block px-4 py-3 text-lg text-brand-dark">Who We Help</a>
        <a href="blog.html" data-nav="blog" class="block px-4 py-3 text-lg text-brand-dark">Blog</a>
        <a href="contact.html" data-nav="contact" class="block px-4 py-3 text-lg text-brand-dark">Contact</a>
        <a href="${PHONE_HREF}" class="block btn-accent text-center mt-6 px-6 py-3 font-semibold">${PHONE_DISPLAY}</a>
        <a href="${EMAIL_HREF}" class="block text-center mt-3 px-6 py-2 text-brand-primary">${EMAIL_DISPLAY}</a>
      </div>
    </div>
  </div>
  <div id="mobile-overlay" class="mobile-overlay fixed inset-0 bg-black/40 hidden" aria-hidden="true"></div>
</header>
`;

const FOOTER_HTML = `
<footer class="site-footer">
  <div class="footer-grid">
    <div>
      <a href="index.html" aria-label="RZ Therapy Solutions Home">
        <img src="https://quseprdus1.blob.core.windows.net/kora-business-images/user-media/23dcfa31-7f3c-4bb3-9e20-6efd0b39302b/de8c94d8-887e-4625-825f-ec262dbc28df/1785749225_0rnelf.png" alt="RZ Therapy Solutions" class="footer-logo" width="80" height="80" loading="lazy" decoding="async">
      </a>
      <p class="text-sm leading-relaxed max-w-xs">
        Trauma-informed, neurodiversity-affirming, person-centered therapy for children, teens, adults, and families in Colchester, Connecticut.
      </p>
    </div>

    <div>
      <h2 class="footer-heading">Explore</h2>
      <ul class="footer-list">
        <li><a href="index.html">Home</a></li>
        <li><a href="about-us.html">About Us</a></li>
        <li><a href="information.html">Information</a></li>
        <li><a href="who-we-help.html">Who We Help</a></li>
        <li><a href="blog.html">Blog</a></li>
        <li><a href="contact.html">Contact</a></li>
        <li><a href="privacy-policy.html">Privacy Policy</a></li>
      </ul>
    </div>

    <div>
      <h2 class="footer-heading">Visit Us</h2>
      <ul class="footer-list">
        <li>
          <a href="${MAP_URL}" target="_blank" rel="noopener noreferrer" class="inline-flex items-start gap-2">
            ${ICON_PIN}
            <span>79A Norwich Ave.<br>Colchester, CT 06415</span>
          </a>
        </li>
        <li>
          <a href="${PHONE_HREF}" class="inline-flex items-center gap-2">
            ${ICON_PHONE}
            ${PHONE_DISPLAY}
          </a>
        </li>
        <li>
          <a href="${EMAIL_HREF}" class="inline-flex items-center gap-2">
            ${ICON_MAIL}
            ${EMAIL_DISPLAY}
          </a>
        </li>
        <li>
          <a href="${PSYCHOLOGY_TODAY}" target="_blank" rel="noopener noreferrer">Psychology Today Partner</a>
        </li>
      </ul>
    </div>
  </div>

  <div class="site-footer__bottom px-1">
    <p>&copy; 2026 RZ Therapy Solutions PLLC. All rights reserved.</p>
    <p>In-person &amp; virtual sessions throughout CT</p>
  </div>
</footer>
`;

function applyActiveNav(page) {
  if (!page) return;
  document.querySelectorAll(`[data-nav="${page}"]`).forEach((link) => {
    link.classList.add('is-active');
  });
}

function ensurePremiumStyles() {
  if (document.querySelector('link[data-rz-premium]')) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'assets/premium.css';
  link.dataset.rzPremium = 'true';
  document.head.appendChild(link);
}

function renderPartials() {
  ensurePremiumStyles();
  const headerMount = document.getElementById('site-header');
  const footerMount = document.getElementById('site-footer');

  if (headerMount) {
    headerMount.innerHTML = HEADER_HTML;
    applyActiveNav(document.body.dataset.page || '');
  }

  if (footerMount) {
    footerMount.innerHTML = FOOTER_HTML;
  }

  document.dispatchEvent(new CustomEvent('site:partials-loaded'));
}

document.addEventListener('DOMContentLoaded', renderPartials);
