// Interactions for the single-page portfolio: nav, language switch, case panels, steppers, galleries.

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const scrollBehavior: ScrollBehavior = reduceMotion ? 'auto' : 'smooth';

/* ---------- Header: border on scroll, active section, mobile menu ---------- */
const nav = document.querySelector<HTMLElement>('[data-nav]');
const navLinks = document.querySelectorAll<HTMLAnchorElement>('[data-nav-links] a[data-key]');
const sections = document.querySelectorAll<HTMLElement>('[data-section]');
let currentKey = 'top';

const onScroll = () => {
  nav?.classList.toggle('is-scrolled', window.scrollY > 8);
  // The last section can't reach the activation line, so mark it at the bottom of the page.
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) setActive('contact');
};
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

function setActive(key: string) {
  currentKey = key;
  navLinks.forEach((a) => {
    if (a.dataset.key === key) a.setAttribute('aria-current', 'location');
    else a.removeAttribute('aria-current');
  });
};

// A section is "active" when it crosses a line ~35% from the top of the viewport.
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) setActive((entry.target as HTMLElement).dataset.section ?? 'top');
    });
  },
  { rootMargin: '-35% 0px -64% 0px' },
);
sections.forEach((s) => observer.observe(s));

const menuButton = document.querySelector<HTMLButtonElement>('[data-menu-button]');
const linksBox = document.querySelector<HTMLElement>('[data-nav-links]');
const setMenu = (open: boolean) => {
  if (!menuButton || !linksBox) return;
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.textContent = open ? menuButton.dataset.closeLabel ?? '' : menuButton.dataset.openLabel ?? '';
  linksBox.classList.toggle('is-open', open);
};
menuButton?.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
navLinks.forEach((a) => a.addEventListener('click', () => setMenu(false)));

/* ---------- Language menu: keeps the section you are reading ---------- */
const langButton = document.querySelector<HTMLButtonElement>('[data-lang-button]');
const langMenu = document.querySelector<HTMLElement>('[data-lang-menu]');
const setLang = (open: boolean) => {
  if (!langButton || !langMenu) return;
  langButton.setAttribute('aria-expanded', String(open));
  langMenu.hidden = !open;
  if (open) langMenu.querySelector<HTMLElement>('a')?.focus();
};
langButton?.addEventListener('click', () => setLang(langMenu?.hidden ?? false));
document.addEventListener('click', (e) => {
  const target = e.target as Node;
  if (langMenu && !langMenu.hidden && !langMenu.contains(target) && !langButton?.contains(target)) setLang(false);
});
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  if (langMenu && !langMenu.hidden) { setLang(false); langButton?.focus(); }
  if (menuButton?.getAttribute('aria-expanded') === 'true') { setMenu(false); menuButton.focus(); }
});

document.querySelectorAll<HTMLAnchorElement>('[data-lang-link]').forEach((a) => {
  a.addEventListener('click', () => {
    const ids = JSON.parse(a.dataset.ids ?? '{}') as Record<string, string>;
    // On the home, keep the section you are reading. Case pages link to the same case in the other language.
    if (!a.dataset.ids) return;
    const hash = ids[currentKey] ?? '';
    a.href = `${a.getAttribute('href')?.split('#')[0]}${hash ? `#${hash}` : ''}`;
  });
});

/* ---------- Case pages: "Back" returns to the case on the home ---------- */
// If the visitor came from the home, go back in history so the browser restores the exact scroll position.
// Otherwise (direct link), the link itself goes to the home anchored at that case.
document.querySelectorAll<HTMLAnchorElement>('[data-back]').forEach((a) => {
  a.addEventListener('click', (e) => {
    try {
      const ref = document.referrer ? new URL(document.referrer) : null;
      const target = new URL(a.href);
      if (ref && ref.origin === location.origin && ref.pathname === target.pathname && history.length > 1) {
        e.preventDefault();
        history.back();
      }
    } catch { /* fall back to the link */ }
  });
});

/* ---------- Flow steppers (ARIA tabs + previous / next) ---------- */
document.querySelectorAll<HTMLElement>('[data-stepper]').forEach((stepper) => {
  const tabs = Array.from(stepper.querySelectorAll<HTMLButtonElement>('[role="tab"]'));
  const panels = Array.from(stepper.querySelectorAll<HTMLElement>('[role="tabpanel"]'));
  const prev = stepper.querySelector<HTMLButtonElement>('[data-step-prev]');
  const next = stepper.querySelector<HTMLButtonElement>('[data-step-next]');
  let index = 0;

  const select = (i: number, focus = false) => {
    index = Math.max(0, Math.min(tabs.length - 1, i));
    tabs.forEach((tab, n) => {
      const on = n === index;
      tab.setAttribute('aria-selected', String(on));
      tab.tabIndex = on ? 0 : -1;
      tab.classList.toggle('is-done', n < index);
      panels[n].hidden = !on;
    });
    if (prev) prev.disabled = index === 0;
    if (next) next.disabled = index === tabs.length - 1;
    if (focus) tabs[index].focus();
    // Keep the selected step visible inside the (horizontally scrollable) list without moving the page.
    const list = tabs[index].parentElement;
    if (list && list.scrollWidth > list.clientWidth) {
      list.scrollTo({ left: tabs[index].offsetLeft - list.offsetLeft - 16, behavior: scrollBehavior });
    }
  };

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => select(i));
    tab.addEventListener('keydown', (e) => {
      const keys: Record<string, number> = { ArrowRight: index + 1, ArrowDown: index + 1, ArrowLeft: index - 1, ArrowUp: index - 1, Home: 0, End: tabs.length - 1 };
      if (e.key in keys) { e.preventDefault(); select(keys[e.key], true); }
    });
  });
  prev?.addEventListener('click', () => select(index - 1));
  next?.addEventListener('click', () => select(index + 1));
});

/* ---------- Evidence galleries ---------- */
document.querySelectorAll<HTMLElement>('[data-gallery]').forEach((gallery) => {
  const track = gallery.querySelector<HTMLElement>('[data-gallery-track]');
  if (!track) return;
  const step = () => (track.firstElementChild as HTMLElement | null)?.offsetWidth ?? track.clientWidth;
  gallery.querySelector('[data-gallery-prev]')?.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: scrollBehavior }));
  gallery.querySelector('[data-gallery-next]')?.addEventListener('click', () => track.scrollBy({ left: step(), behavior: scrollBehavior }));
  track.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); track.scrollBy({ left: step(), behavior: scrollBehavior }); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); track.scrollBy({ left: -step(), behavior: scrollBehavior }); }
  });
});

/* ---------- Logo banner: moves on its own, arrows push it either way ---------- */
const marquee = document.querySelector<HTMLElement>('[data-marquee]');
const marqueeTrack = marquee?.querySelector<HTMLElement>('[data-marquee-track]');
if (marquee && marqueeTrack && !reduceMotion) {
  marquee.classList.add('is-js');
  const speed = 40; // px per second, same feel as the CSS version
  let offset = 0;
  let paused = false;
  let boost = 0; // extra distance still to travel after an arrow click
  let last = performance.now();
  const half = () => marqueeTrack.scrollWidth / 2;
  const step = () => (marqueeTrack.querySelector('li')?.getBoundingClientRect().width ?? 200) + 96;

  const frame = (now: number) => {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    if (!paused) offset += speed * dt;
    if (boost !== 0) {
      const move = boost * Math.min(1, dt * 8); // ease out
      offset += move;
      boost -= move;
      if (Math.abs(boost) < 0.5) boost = 0;
    }
    const h = half();
    if (h > 0) offset = ((offset % h) + h) % h;
    marqueeTrack.style.transform = `translateX(${-offset}px)`;
    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);

  const inner = marquee.querySelector<HTMLElement>('.marquee');
  inner?.addEventListener('mouseenter', () => { paused = true; });
  inner?.addEventListener('mouseleave', () => { paused = false; });
  inner?.addEventListener('focusin', () => { paused = true; });
  inner?.addEventListener('focusout', () => { paused = false; });
  marquee.querySelector('[data-marquee-next]')?.addEventListener('click', () => { boost += step(); });
  marquee.querySelector('[data-marquee-prev]')?.addEventListener('click', () => { boost -= step(); });
}
