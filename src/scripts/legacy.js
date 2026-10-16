// Nav scroll
const nav=document.getElementById('navbar');
window.addEventListener('scroll',()=>{nav.classList.toggle('scrolled',window.scrollY>40)},{passive:true});

// Reveal animations. Triggered by how far the element has come into view, not by
// a share of its height: a share never arrives for a card taller than ten screens.
const ro=new IntersectionObserver(e=>{e.forEach(n=>{if(n.isIntersecting)n.target.classList.add('visible')})},{threshold:0,rootMargin:'0px 0px -80px 0px'});
document.querySelectorAll('.reveal').forEach(e=>ro.observe(e));
// Siblings enter together, which reads as one flat block. Stagger them so the
// group arrives as a cascade; capped so a long list never feels laggy.
document.querySelectorAll('.reveal').forEach(el=>{
  const sibs=Array.from(el.parentElement.children).filter(n=>n.classList.contains('reveal'));
  if(sibs.length<2) return;
  el.style.transitionDelay=Math.min(sibs.indexOf(el),5)*70+'ms';
});

// Counter animation
const co=new IntersectionObserver(e=>{e.forEach(n=>{if(n.isIntersecting&&n.target.dataset.target){const t=parseInt(n.target.dataset.target),s=performance.now(),el=n.target;(function tick(now){const p=Math.min((now-s)/1200,1);el.textContent=Math.round((1-Math.pow(1-p,3))*t);if(p<1)requestAnimationFrame(tick)})(s);co.unobserve(el)}})},{threshold:.5});
document.querySelectorAll('.counter[data-target]').forEach(e=>co.observe(e));

// Active nav highlight
const secs=document.querySelectorAll('section[id]'),nls=document.querySelectorAll('.nav-links a');
window.addEventListener('scroll',()=>{let c='';secs.forEach(s=>{if(scrollY>=s.offsetTop-120)c=s.id});nls.forEach(l=>{l.style.color=l.hash==='#'+c?'var(--text)':''})},{passive:true});

// Project category tabs + deep links to a single project
(function () {
  const tabs = document.querySelectorAll('.ptab');
  const cats = document.querySelectorAll('.projects-category');
  if (!tabs.length) return;
  function show(cat, force) {
    cats.forEach(c => {
      const on = (cat === 'all' || c.dataset.cat === cat);
      c.hidden = !on;
      // A category the visitor never scrolled past has no .visible, so it is
      // still opacity:0. Reveal the category itself as well as its contents,
      // or switching to it shows an empty page.
      if (on && force) {
        c.classList.add('visible');
        c.querySelectorAll('.reveal').forEach(e => e.classList.add('visible'));
      }
    });
    tabs.forEach(t => t.classList.toggle('active', t.dataset.cat === cat));
  }
  const bar = document.querySelector('.projects-tabs');
  tabs.forEach(t => t.addEventListener('click', () => {
    show(t.dataset.cat, true);
    // filtering changes the height above you, so anchor the view to the tabs
    if (bar && bar.getBoundingClientRect().top < 0) bar.scrollIntoView({ block: 'start' });
  }));
  function openFromHash() {
    const id = decodeURIComponent(location.hash.slice(1));
    if (!id) return;
    const card = document.getElementById(id);
    if (!card || !card.classList.contains('project-card')) return;
    show('all', true);
    const d = card.querySelector('details.pcard');
    if (d) d.open = true;
    requestAnimationFrame(() => card.scrollIntoView({ block: 'start' }));
  }
  window.addEventListener('hashchange', openFromHash);
  openFromHash();
})();

// Collapsing a long card should not leave you stranded below its header
document.querySelectorAll('details.pcard').forEach(d => {
  d.addEventListener('toggle', () => {
    if (!d.open && d.getBoundingClientRect().top < 0) d.scrollIntoView({ block: 'start' });
  });
});

// Click-to-load facades. A PDF or YouTube frame is only created when someone
// asks for it: the old page requested six reports (130 MB) and three YouTube
// players on load, all inside cards most visitors never open.
document.addEventListener('click', e => {
  const pdf = e.target.closest('.pdf-facade');
  if (pdf) {
    const f = document.createElement('iframe');
    f.src = pdf.dataset.pdf;
    f.title = pdf.dataset.title || '';
    pdf.replaceWith(f);
    return;
  }
  const yt = e.target.closest('.yt-facade');
  if (yt) {
    const f = document.createElement('iframe');
    f.src = 'https://www.youtube-nocookie.com/embed/' + yt.dataset.yt + '?autoplay=1';
    f.title = yt.title || 'YouTube';
    f.allow = 'autoplay; encrypted-media; picture-in-picture';
    f.allowFullscreen = true;
    yt.replaceChildren(f);
    yt.classList.remove('yt-facade');
  }
});

// Image slider scroll function
function scrollSlider(id, dir) {
  const track = document.getElementById(id);
  if (!track) return;
  const slideWidth = track.querySelector('.slide').offsetWidth + 14;
  track.scrollBy({ left: dir * slideWidth, behavior: 'smooth' });
}

// Lightbox — navigable within the slider the image belongs to
let lbGroup = [], lbIndex = 0;
function openLightbox(slideEl) {
  const img = slideEl.querySelector('img');
  if (!img) return;
  const track = slideEl.closest('.img-slider-track');
  lbGroup = track ? Array.from(track.querySelectorAll('.slide.has-img img')) : [img];
  lbIndex = Math.max(0, lbGroup.indexOf(img));
  renderLightbox();
  const overlay = document.getElementById('lightbox');
  overlay.style.display = 'flex';
  requestAnimationFrame(() => overlay.classList.add('active'));
  document.body.style.overflow = 'hidden';
}
function renderLightbox() {
  const cur = lbGroup[lbIndex];
  if (!cur) return;
  const lbImg = document.getElementById('lightbox-img');
  // The slide shows a small srcset; the lightbox gets the large rendition,
  // fetched only now that someone has actually opened the image.
  lbImg.src = cur.dataset.full || cur.currentSrc || cur.src;
  lbImg.alt = cur.alt;
  const multi = lbGroup.length > 1;
  document.getElementById('lb-prev').hidden = !multi;
  document.getElementById('lb-next').hidden = !multi;
  const counter = document.getElementById('lb-counter');
  counter.hidden = !multi;
  counter.textContent = multi ? (lbIndex + 1) + ' / ' + lbGroup.length : '';
}
function lightboxStep(dir, ev) {
  if (ev) ev.stopPropagation();
  if (lbGroup.length < 2) return;
  lbIndex = (lbIndex + dir + lbGroup.length) % lbGroup.length;
  renderLightbox();
}
function closeLightbox() {
  const overlay = document.getElementById('lightbox');
  overlay.classList.remove('active');
  setTimeout(() => { overlay.style.display = 'none'; }, 300);
  document.body.style.overflow = '';
}
document.addEventListener('keydown', e => {
  const overlay = document.getElementById('lightbox');
  if (!overlay || !overlay.classList.contains('active')) return;
  if (e.key === 'Escape') closeLightbox();
  else if (e.key === 'ArrowRight') { e.preventDefault(); lightboxStep(1); }
  else if (e.key === 'ArrowLeft') { e.preventDefault(); lightboxStep(-1); }
});
// Swipe between images on touch
(function () {
  const overlay = document.getElementById('lightbox');
  if (!overlay) return;
  let startX = null;
  overlay.addEventListener('touchstart', e => { startX = e.changedTouches[0].clientX; }, { passive: true });
  overlay.addEventListener('touchend', e => {
    if (startX === null) return;
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 45) lightboxStep(dx < 0 ? 1 : -1);
    startX = null;
  }, { passive: true });
})();

// Light / dark switch. A choice is remembered; until one is made, the page
// follows the system setting, live. The head script already set the theme.
(function () {
  var root = document.documentElement;
  var btns = document.querySelectorAll('[data-theme-toggle]');
  if (!btns.length) return;
  function stored() { try { return localStorage.getItem('theme'); } catch (e) { return null; } }
  function label() {
    var dark = root.dataset.theme === 'dark';
    // The labels come from the button, in the page's language.
    btns.forEach(function (b) { b.setAttribute('aria-label', dark ? b.dataset.labelLight : b.dataset.labelDark); });
  }
  function set(theme, remember) {
    root.classList.add('theme-switching');
    root.dataset.theme = theme;
    label();
    if (remember) { try { localStorage.setItem('theme', theme); } catch (e) {} }
    setTimeout(function () { root.classList.remove('theme-switching'); }, 400);
  }
  btns.forEach(function (b) {
    b.addEventListener('click', function () { set(root.dataset.theme === 'dark' ? 'light' : 'dark', true); });
  });
  var mq = matchMedia('(prefers-color-scheme: dark)');
  var onChange = function (e) { if (!stored()) set(e.matches ? 'dark' : 'light', false); };
  if (mq.addEventListener) mq.addEventListener('change', onChange); else mq.addListener(onChange);
  label();
})();
