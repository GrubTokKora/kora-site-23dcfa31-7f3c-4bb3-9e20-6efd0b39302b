window.KORA_SITE_CONFIG = {
  apiBaseUrl: 'https://kora-agent.grubtok.com',
  businessId: '23dcfa31-7f3c-4bb3-9e20-6efd0b39302b',
  recaptchaSiteKey: '6LcsdJYsAAAAAAur-h7cYlZuGJTmijNHmOi5kFH7',
};

function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const closeBtn = document.getElementById('close-menu-btn');
  const menu = document.getElementById('mobile-menu');
  const overlay = document.getElementById('mobile-overlay');

  if (!menu || !menuBtn) return;

  function openMenu() {
    menu.classList.add('active');
    menu.setAttribute('aria-hidden', 'false');
    if (overlay) {
      overlay.classList.remove('hidden');
      overlay.setAttribute('aria-hidden', 'false');
    }
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    menu.classList.remove('active');
    menu.setAttribute('aria-hidden', 'true');
    if (overlay) {
      overlay.classList.add('hidden');
      overlay.setAttribute('aria-hidden', 'true');
    }
    document.body.style.overflow = '';
  }

  menuBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (overlay) overlay.addEventListener('click', closeMenu);
  menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('active')) closeMenu();
  });
}

function initNavbarScroll() {
  const header = document.querySelector('.site-header');
  if (!header || header.dataset.scrollBound === 'true') return;
  header.dataset.scrollBound = 'true';

  const update = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 24);
  };

  update();
  window.addEventListener('scroll', update, { passive: true });
}

/** Keep body padding-top in sync with the fixed header height (top bar collapses on scroll). */
function syncHeaderOffset() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  const h = Math.ceil(header.getBoundingClientRect().height);
  if (h > 0) {
    document.body.style.paddingTop = `${h}px`;
  }
}

function initHeaderLayout() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  syncHeaderOffset();

  if (header.dataset.offsetBound === 'true') return;
  header.dataset.offsetBound = 'true';

  window.addEventListener(
    'scroll',
    () => {
      // After top-bar collapse transition, remeasure
      window.requestAnimationFrame(syncHeaderOffset);
    },
    { passive: true }
  );
  window.addEventListener('resize', syncHeaderOffset, { passive: true });

  if (typeof ResizeObserver !== 'undefined') {
    const ro = new ResizeObserver(() => syncHeaderOffset());
    ro.observe(header);
  }
}

/**
 * Split blog post body into scroll-revealed blocks.
 * Hero (.page-hero) is intentionally skipped.
 */
function prepareBlogArticleFadeIns() {
  document.querySelectorAll('.blog-article').forEach((article) => {
    if (article.dataset.fadePrepared === '1') return;
    article.dataset.fadePrepared = '1';

    const figure = article.querySelector(':scope > .blog-article__figure');
    if (figure) figure.classList.add('fade-in');

    const body = article.querySelector(':scope > .blog-article__body');
    if (!body) return;

    const kids = Array.from(body.children);
    let group = [];

    const flush = () => {
      if (!group.length) return;
      const wrap = document.createElement('div');
      wrap.className = 'blog-article__block fade-in';
      group[0].before(wrap);
      group.forEach((el) => wrap.appendChild(el));
      group = [];
    };

    kids.forEach((el) => {
      const isSectionStart = el.matches(
        'h2, figure, .blog-article__inline, .blog-article__cta, .blog-article__footer'
      );
      if (isSectionStart) {
        flush();
        if (el.matches('h2')) {
          group.push(el);
        } else {
          el.classList.add('fade-in');
        }
        return;
      }
      group.push(el);
    });
    flush();
  });
}

function initFadeIn() {
  prepareBlogArticleFadeIns();

  const els = document.querySelectorAll('.fade-in');
  if (!els.length) return;

  const prefersReduced =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReduced || !('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  els.forEach((el) => observer.observe(el));
}

function setFormStatus(form, text, kind) {
  const statusEl = form.querySelector('.form-status');
  if (!statusEl) return;
  statusEl.textContent = text;
  statusEl.classList.toggle('is-visible', Boolean(text));
  statusEl.classList.remove('form-status--error', 'form-status--success', 'form-status--neutral');
  if (kind === 'error') statusEl.classList.add('form-status--error');
  else if (kind === 'success') statusEl.classList.add('form-status--success');
  else if (kind) statusEl.classList.add('form-status--neutral');
}

function setSubmittingState(form, isSubmitting, busyLabel) {
  const submitBtn = form.querySelector('button[type="submit"]');
  if (!submitBtn) return;
  if (isSubmitting) {
    submitBtn.dataset.originalText = submitBtn.textContent || 'Submit';
    submitBtn.textContent = busyLabel || 'Sending...';
    submitBtn.disabled = true;
    return;
  }
  submitBtn.textContent = submitBtn.dataset.originalText || 'Submit';
  submitBtn.disabled = false;
}

function parseApiError(data, fallback) {
  const detail = data && data.detail;
  if (typeof detail === 'string' && detail.trim()) return detail;
  if (Array.isArray(detail)) {
    const joined = detail.map((d) => d.msg || d.message || '').filter(Boolean).join(' ');
    if (joined) return joined;
  }
  if (data && typeof data.message === 'string' && data.message.trim()) return data.message;
  return fallback;
}

let recaptchaScriptPromise = null;
const RECAPTCHA_W = 304;
const RECAPTCHA_H = 78;
const responsiveRecaptchaBoxes = [];

function scaleRecaptcha(box) {
  const wrap = box.parentElement;
  if (!wrap || !wrap.classList.contains('g-recaptcha-scale')) return;
  const available = wrap.clientWidth;
  if (!available) return;
  const scale = Math.min(1, available / RECAPTCHA_W);
  box.style.transform = scale < 1 ? `scale(${scale.toFixed(4)})` : 'none';
  wrap.style.height = `${Math.ceil(RECAPTCHA_H * scale)}px`;
}

function makeRecaptchaResponsive(box) {
  if (!box || box.dataset.koraRecaptchaResponsive === 'true') return;
  box.dataset.koraRecaptchaResponsive = 'true';

  let wrap = box.parentElement;
  if (!wrap || !wrap.classList.contains('g-recaptcha-scale')) {
    wrap = document.createElement('div');
    wrap.className = 'g-recaptcha-scale';
    box.parentNode.insertBefore(wrap, box);
    wrap.appendChild(box);
  }

  scaleRecaptcha(box);
  const observer = new MutationObserver(() => scaleRecaptcha(box));
  observer.observe(box, { childList: true, subtree: true });
  responsiveRecaptchaBoxes.push(box);
}

let recaptchaResizeTimer = null;
window.addEventListener('resize', () => {
  window.clearTimeout(recaptchaResizeTimer);
  recaptchaResizeTimer = window.setTimeout(() => {
    responsiveRecaptchaBoxes.forEach(scaleRecaptcha);
  }, 150);
});

function ensureRecaptchaScript(siteKey) {
  if (!siteKey) return Promise.resolve();
  if (typeof window.grecaptcha !== 'undefined') return Promise.resolve();
  if (recaptchaScriptPromise) return recaptchaScriptPromise;
  recaptchaScriptPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector('script[data-kora-recaptcha="true"]');
    if (existing) {
      existing.addEventListener('load', () => resolve());
      existing.addEventListener('error', () => reject(new Error('reCAPTCHA failed to load')));
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js';
    script.async = true;
    script.defer = true;
    script.dataset.koraRecaptcha = 'true';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('reCAPTCHA failed to load'));
    document.head.appendChild(script);
  });
  return recaptchaScriptPromise;
}

function getRecaptchaToken(form) {
  if (typeof window.grecaptcha === 'undefined') return '';
  const recaptchaEl = form.querySelector('.g-recaptcha');
  if (!recaptchaEl) return '';
  return window.grecaptcha.getResponse() || '';
}

function resetRecaptcha(form) {
  if (typeof window.grecaptcha === 'undefined') return;
  if (form.querySelector('.g-recaptcha')) window.grecaptcha.reset();
}

/**
 * Kora public forms API — POST {apiBaseUrl}/api/v1/public/forms/submit
 * Requires reCAPTCHA v2 token (captcha_token) + business_id matching the Kora site.
 */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form || form.dataset.bound) return;
  form.dataset.bound = 'true';

  const config = window.KORA_SITE_CONFIG || {};
  const apiBaseUrl = (config.apiBaseUrl || '').replace(/\/+$/, '');
  const businessId = config.businessId || '';
  const recaptchaSiteKey = (config.recaptchaSiteKey || '').trim();
  const recaptchaEl = form.querySelector('.g-recaptcha');

  if (recaptchaEl && recaptchaSiteKey) {
    recaptchaEl.setAttribute('data-sitekey', recaptchaSiteKey);
    makeRecaptchaResponsive(recaptchaEl);
    form.addEventListener(
      'focusin',
      () => {
        ensureRecaptchaScript(recaptchaSiteKey).catch(() => {
          setFormStatus(form, 'Security check failed to load. Please refresh and try again.', 'error');
        });
      },
      { once: true }
    );
  } else if (recaptchaEl && !recaptchaSiteKey) {
    recaptchaEl.style.display = 'none';
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const firstName = ((form.querySelector('[name="first_name"]') || {}).value || '').trim();
    const lastName = ((form.querySelector('[name="last_name"]') || {}).value || '').trim();
    const email = ((form.querySelector('[name="email"]') || {}).value || '').trim();
    const message = ((form.querySelector('[name="message"]') || {}).value || '').trim();
    const name =
      ((form.querySelector('[name="name"]') || {}).value || '').trim() ||
      `${firstName} ${lastName}`.trim() ||
      firstName ||
      lastName;

    if (!name || !email || !message) {
      setFormStatus(form, 'Please fill in your name, email, and message.', 'error');
      return;
    }

    if (!businessId || !apiBaseUrl) {
      setFormStatus(form, 'Form submission is not configured for this site.', 'error');
      return;
    }

    if (recaptchaEl && !recaptchaSiteKey) {
      setFormStatus(form, 'Form temporarily unavailable.', 'error');
      return;
    }

    if (recaptchaEl && recaptchaSiteKey) {
      try {
        await ensureRecaptchaScript(recaptchaSiteKey);
      } catch {
        setFormStatus(form, 'Security check failed to load. Please refresh and try again.', 'error');
        return;
      }
      const captchaToken = getRecaptchaToken(form);
      if (!captchaToken) {
        setFormStatus(form, 'Please complete the security check.', 'error');
        return;
      }
    }

    const captchaToken = getRecaptchaToken(form);
    setSubmittingState(form, true, 'Sending...');
    setFormStatus(form, 'Sending...', 'neutral');

    try {
      const response = await fetch(`${apiBaseUrl}/api/v1/public/forms/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          business_id: businessId,
          form_type: 'contact',
          form_data: {
            name,
            email,
            message,
            first_name: firstName || undefined,
            last_name: lastName || undefined,
          },
          submitter_email: email,
          captcha_token: captchaToken || '',
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(parseApiError(data, 'Something went wrong. Please try again or call us.'));
      }
      form.reset();
      resetRecaptcha(form);
      setFormStatus(form, data.message || 'Thank you! Your message has been received.', 'success');
    } catch (error) {
      resetRecaptcha(form);
      setFormStatus(form, error.message || 'Something went wrong. Please try again or call us.', 'error');
    } finally {
      setSubmittingState(form, false);
    }
  });
}

function initLightbox() {
  const triggers = Array.from(document.querySelectorAll('[data-lightbox]'));
  if (!triggers.length || document.getElementById('site-lightbox')) return;

  const root = document.createElement('div');
  root.id = 'site-lightbox';
  root.className = 'lightbox';
  root.setAttribute('role', 'dialog');
  root.setAttribute('aria-modal', 'true');
  root.setAttribute('aria-label', 'Image gallery');
  root.hidden = true;
  root.innerHTML = `
    <div class="lightbox__blur" data-lightbox-blur aria-hidden="true"></div>
    <div class="lightbox__stage">
      <img class="lightbox__image" data-lightbox-image alt="">
    </div>
    <div class="lightbox__counter" data-lightbox-counter aria-live="polite"></div>
    <button type="button" class="lightbox__close" data-lightbox-close aria-label="Close gallery">&times;</button>
    <button type="button" class="lightbox__nav lightbox__nav--prev" data-lightbox-prev aria-label="Previous image">
      <span class="lightbox__nav-icon" aria-hidden="true"></span>
    </button>
    <button type="button" class="lightbox__nav lightbox__nav--next" data-lightbox-next aria-label="Next image">
      <span class="lightbox__nav-icon" aria-hidden="true"></span>
    </button>
  `;
  document.body.appendChild(root);

  const blurEl = root.querySelector('[data-lightbox-blur]');
  const imageEl = root.querySelector('[data-lightbox-image]');
  const counterEl = root.querySelector('[data-lightbox-counter]');
  const closeBtns = root.querySelectorAll('[data-lightbox-close]');
  const prevBtn = root.querySelector('[data-lightbox-prev]');
  const nextBtn = root.querySelector('[data-lightbox-next]');

  let items = [];
  let index = 0;
  let lastFocus = null;

  const getSrc = (el) => {
    const img = el.matches('img') ? el : el.querySelector('img');
    return el.getAttribute('data-lightbox-src') || (img && img.currentSrc) || (img && img.src) || '';
  };

  const getAlt = (el) => {
    const img = el.matches('img') ? el : el.querySelector('img');
    return el.getAttribute('data-lightbox-alt') || (img && img.alt) || '';
  };

  const collectGroup = (trigger) => {
    const gallery = trigger.closest('[data-lightbox-gallery]');
    if (gallery) return Array.from(gallery.querySelectorAll('[data-lightbox]'));
    return [trigger];
  };

  const render = () => {
    const item = items[index];
    if (!item) return;
    const src = getSrc(item);
    const alt = getAlt(item);
    const total = items.length;

    root.classList.toggle('is-single', total < 2);
    counterEl.textContent = `${index + 1} / ${total}`;
    blurEl.style.backgroundImage = src ? `url("${src}")` : '';

    imageEl.classList.remove('is-ready');
    imageEl.alt = alt;

    const absolute = new URL(src, window.location.href).href;
    if (imageEl.src !== absolute) {
      imageEl.src = src;
    } else {
      imageEl.classList.add('is-ready');
    }
  };

  imageEl.addEventListener('load', () => {
    imageEl.classList.add('is-ready');
  });

  const open = (trigger) => {
    items = collectGroup(trigger);
    index = Math.max(0, items.indexOf(trigger));
    lastFocus = document.activeElement;
    root.hidden = false;
    requestAnimationFrame(() => root.classList.add('is-open'));
    document.body.classList.add('lightbox-open');
    render();
    root.querySelector('[data-lightbox-close]').focus();
  };

  const close = () => {
    root.classList.remove('is-open');
    document.body.classList.remove('lightbox-open');
    window.setTimeout(() => {
      if (!root.classList.contains('is-open')) {
        root.hidden = true;
        imageEl.removeAttribute('src');
        imageEl.classList.remove('is-ready');
        blurEl.style.backgroundImage = '';
      }
    }, 300);
    if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
  };

  const showNext = (delta) => {
    if (items.length < 2) return;
    index = (index + delta + items.length) % items.length;
    render();
  };

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', () => open(trigger));
    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        open(trigger);
      }
    });
  });

  closeBtns.forEach((btn) => btn.addEventListener('click', close));
  prevBtn.addEventListener('click', () => showNext(-1));
  nextBtn.addEventListener('click', () => showNext(1));

  root.addEventListener('click', (e) => {
    if (e.target === root || e.target.classList.contains('lightbox__stage')) close();
  });

  document.addEventListener('keydown', (e) => {
    if (!root.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') showNext(-1);
    if (e.key === 'ArrowRight') showNext(1);
  });
}

function initAccordion() {
  document.querySelectorAll('[data-accordion]').forEach((root) => {
    if (root.dataset.bound === 'true') return;
    root.dataset.bound = 'true';

    root.querySelectorAll('.faq-item__trigger').forEach((btn) => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.faq-item');
        const panel = item && item.querySelector('.faq-item__panel');
        if (!item || !panel) return;

        const isOpen = item.classList.contains('is-open');

        // Close siblings (single-open accordion)
        root.querySelectorAll('.faq-item.is-open').forEach((openItem) => {
          if (openItem === item) return;
          openItem.classList.remove('is-open');
          const openBtn = openItem.querySelector('.faq-item__trigger');
          const openPanel = openItem.querySelector('.faq-item__panel');
          if (openBtn) openBtn.setAttribute('aria-expanded', 'false');
          if (openPanel) openPanel.hidden = true;
        });

        item.classList.toggle('is-open', !isOpen);
        btn.setAttribute('aria-expanded', String(!isOpen));
        panel.hidden = isOpen;
      });
    });
  });
}

function boot() {
  initMobileMenu();
  initNavbarScroll();
  initHeaderLayout();
  initFadeIn();
  initContactForm();
  initLightbox();
  initAccordion();
}

document.addEventListener('DOMContentLoaded', boot);
