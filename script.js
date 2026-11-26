// ============================================================
// LINKS — fill these in, everything on the page updates.
// ============================================================
const LINKS = {
  // FOR NOW: every booking/buy button opens an email to Chan.
  // Later: put your Cal.com link back here, e.g.
  //   cal: 'https://cal.com/jaijam-wannapat-khep09/online60',
  // and your payment links (PayPal/Stripe) for stripe1, stripe8, stripe20.
  cal: 'mailto:jjwannapat@gmail.com?subject=Booking%20a%20voice%20lesson&body=Hi%20Chan%2C%0A%0AI%27d%20like%20to%20book%20voice%20lessons.%0A%0AName%3A%0APlan%20%281%20lesson%20/%208%20lessons%20/%2020%20lessons%29%3A%0AOnline%20or%20onsite%20%28Bangkok%29%3A%0AMy%20goal%3A%0ASongs%20or%20styles%20I%20love%3A%0ALanguage%20%28Thai%20/%20English%29%3A%0ATimes%20that%20work%20for%20me%20%28and%20my%20time%20zone%29%3A%0A%0AThank%20you%21',
  stripe1: 'mailto:jjwannapat@gmail.com?subject=Booking%3A%201%20Timer%20%281%20lesson%29&body=Hi%20Chan%2C%0A%0AI%27d%20like%20to%20book%20voice%20lessons.%0A%0AName%3A%0APlan%3A%201%20Timer%20%281%20lesson%29%0AOnline%20or%20onsite%20%28Bangkok%29%3A%0AMy%20goal%3A%0ASongs%20or%20styles%20I%20love%3A%0ALanguage%20%28Thai%20/%20English%29%3A%0ATimes%20that%20work%20for%20me%20%28and%20my%20time%20zone%29%3A%0A%0AThank%20you%21',
  stripe8: 'mailto:jjwannapat@gmail.com?subject=Booking%3A%208%20Lessons&body=Hi%20Chan%2C%0A%0AI%27d%20like%20to%20book%20voice%20lessons.%0A%0AName%3A%0APlan%3A%208%20Lessons%0AOnline%20or%20onsite%20%28Bangkok%29%3A%0AMy%20goal%3A%0ASongs%20or%20styles%20I%20love%3A%0ALanguage%20%28Thai%20/%20English%29%3A%0ATimes%20that%20work%20for%20me%20%28and%20my%20time%20zone%29%3A%0A%0AThank%20you%21',
  stripe20: 'mailto:jjwannapat@gmail.com?subject=Booking%3A%2020%20Lessons&body=Hi%20Chan%2C%0A%0AI%27d%20like%20to%20book%20voice%20lessons.%0A%0AName%3A%0APlan%3A%2020%20Lessons%0AOnline%20or%20onsite%20%28Bangkok%29%3A%0AMy%20goal%3A%0ASongs%20or%20styles%20I%20love%3A%0ALanguage%20%28Thai%20/%20English%29%3A%0ATimes%20that%20work%20for%20me%20%28and%20my%20time%20zone%29%3A%0A%0AThank%20you%21',
  videoHowITeach: 'wZBU6qVzWrk',
  videoZoomSetup: 'W_5h6rHxaG8',
  videoFreeLesson: 'BOwIiu0vIio',
  youtubeChannel: ''
};

// Until a link is set, its buttons open the "Ask Chan" panel instead.
document.querySelectorAll('[data-link]').forEach(el => {
  const url = LINKS[el.dataset.link];
  if (url) {
    el.href = url;
    if (url.startsWith('mailto:')) { el.removeAttribute('target'); el.removeAttribute('rel'); }
  } else {
    el.addEventListener('click', (e) => { e.preventDefault(); openAsk(); });
  }
});

if (LINKS.youtubeChannel) {
  document.querySelectorAll('[data-yt-channel]').forEach(a => { a.href = LINKS.youtubeChannel; });
}

// YouTube videos.
// Each video shows its preview picture with a play button. One click
// plays it right there on the page (no trip to YouTube).
// Opened straight from your computer (file://), YouTube refuses to play
// embeds ("Error 153"), so there the click opens YouTube instead.
document.querySelectorAll('[data-youtube]').forEach(frame => {
  const id = LINKS[frame.dataset.youtube];
  if (!id) return;
  const vid = encodeURIComponent(id);
  const title = frame.dataset.title || 'Video';
  frame.innerHTML = '';

  const thumb = document.createElement('button');
  thumb.type = 'button';
  thumb.className = 'video-thumb';
  thumb.setAttribute('aria-label', 'Play video: ' + title);

  const img = document.createElement('img');
  img.className = 'video-thumb-img';
  img.alt = '';
  img.loading = 'lazy';
  img.decoding = 'async';
  // Full-size preview; older videos without one fall back to the standard picture.
  img.addEventListener('load', () => {
    if (img.naturalWidth <= 120 && !img.dataset.fallback) {
      img.dataset.fallback = '1';
      img.src = 'https://i.ytimg.com/vi/' + vid + '/hqdefault.jpg';
    }
  });
  img.src = 'https://i.ytimg.com/vi/' + vid + '/maxresdefault.jpg';

  const play = document.createElement('span');
  play.className = 'video-thumb-play';
  play.setAttribute('aria-hidden', 'true');
  thumb.append(img, play);

  thumb.addEventListener('click', () => {
    if (location.protocol === 'file:') {
      window.open('https://www.youtube.com/watch?v=' + vid, '_blank', 'noopener');
      return;
    }
    const iframe = document.createElement('iframe');
    iframe.src = 'https://www.youtube-nocookie.com/embed/' + vid + '?autoplay=1&rel=0&playsinline=1';
    iframe.title = title;
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    iframe.allow = 'autoplay; accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen';
    iframe.allowFullscreen = true;
    frame.classList.add('is-playing');
    frame.replaceChildren(iframe);
    iframe.focus();
  });

  frame.appendChild(thumb);
});

// ===== Person Data (Read more modal) =====
const people = {
  chan: {
    name: 'Chan Wannapat',
    img: 'images/about.jpg',
    bio: "Chan (Jaijam) Wannapat (she/her) is a singer, performer and vocal coach from Thailand. A Fulbright Scholar, she earned her MM in Musical Theatre Vocal Performance from Arizona State University and holds a First Class Honors degree from Mahidol University.\n\nShe is best known as the Thai voice of Mirabel in Disney's Encanto. Selected stage credits include Natasha in Natasha, Pierre & The Great Comet of 1812 (ASU), Adara in Luna The Immersive Musical (Castscape), and featured roles in original productions at Thailand's Ratchadalai Theatre.\n\nThis life is so short — let's live happy, and share love with the world.",
    actionLabel: 'See on Instagram',
    actionUrl: 'https://www.instagram.com/chan_wannapat'
  }
};

// ===== DOM Elements =====
const hamburgerBtn = document.getElementById('hamburgerBtn');
const floatingHamburgerBtn = document.getElementById('floatingHamburgerBtn');
const menuOverlay = document.getElementById('menuOverlay');
const menuCloseBtn = document.getElementById('menuCloseBtn');
const menuLinks = document.querySelectorAll('.menu-link[data-scroll]');
const modalBackdrop = document.getElementById('modalBackdrop');
const modal = document.getElementById('modal');
const modalCloseBtn = document.getElementById('modalCloseBtn');
const modalImg = document.getElementById('modalImg');
const modalName = document.getElementById('modalName');
const modalBio = document.getElementById('modalBio');
const modalActionBtn = document.getElementById('modalActionBtn');
const readMoreBtns = document.querySelectorAll('[data-person]');

// ===== Menu =====
function openMenu() {
  menuOverlay.classList.add('open');
  document.body.classList.add('menu-open');
}
function closeMenu() {
  menuOverlay.classList.remove('open');
  document.body.classList.remove('menu-open');
}

hamburgerBtn.addEventListener('click', openMenu);
floatingHamburgerBtn.addEventListener('click', openMenu);
menuCloseBtn.addEventListener('click', closeMenu);

menuLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    closeMenu();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      setTimeout(() => {
        target.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  });
});

// In-page buttons (See pricing, Book & pay…)
document.querySelectorAll('[data-scroll-link]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ===== Read more Modal =====
function openModal(personKey) {
  const person = people[personKey];
  if (!person) return;

  modalImg.src = person.img;
  modalImg.alt = person.name;
  modalName.textContent = person.name;
  modalBio.textContent = person.bio;
  modalActionBtn.href = person.actionUrl;
  modalActionBtn.innerHTML = person.actionLabel + ' <span class="btn-arrow">&rarr;</span>';

  modalBackdrop.classList.add('active');
  modal.classList.add('active');
  document.body.classList.add('modal-open');
}

function closeModal() {
  modalBackdrop.classList.remove('active');
  modal.classList.remove('active');
  document.body.classList.remove('modal-open');
}

readMoreBtns.forEach(btn => {
  btn.addEventListener('click', () => openModal(btn.dataset.person));
});
modalCloseBtn.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', closeModal);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (modal.classList.contains('active')) closeModal();
    if (menuOverlay.classList.contains('open')) closeMenu();
    if (askPanel.classList.contains('active')) closeAsk();
  }
});

// ===== Ask Chan panel (LINE) =====
const askPanel = document.getElementById('askPanel');
const askBackdrop = document.getElementById('askBackdrop');
const askCloseBtn = document.getElementById('askCloseBtn');
let askReturnFocus = null;

function openAsk() {
  askReturnFocus = document.activeElement;
  const fromMenu = menuOverlay.classList.contains('open');
  document.body.classList.add('ask-open');
  menuOverlay.classList.remove('open');
  document.body.classList.remove('menu-open');
  setTimeout(() => {
    askBackdrop.classList.add('active');
    askPanel.classList.add('active');
    askPanel.setAttribute('aria-hidden', 'false');
    askCloseBtn.focus();
  }, fromMenu ? 300 : 0);
}
function closeAsk() {
  askBackdrop.classList.remove('active');
  askPanel.classList.remove('active');
  askPanel.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('ask-open');
  if (askReturnFocus) askReturnFocus.focus();
}
document.querySelectorAll('[data-ask]').forEach(btn => btn.addEventListener('click', openAsk));
askCloseBtn.addEventListener('click', closeAsk);
askBackdrop.addEventListener('click', closeAsk);

// ===== Logo → scroll to top =====
const logoHomeBtn = document.getElementById('logoHomeBtn');
if (logoHomeBtn) {
  logoHomeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ===== Scroll Animations =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = parseInt(entry.target.dataset.delay) || 0;
      setTimeout(() => entry.target.classList.add('visible'), delay);
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('.animate-in').forEach(el => observer.observe(el));

// ===== FAQ "More questions" =====
const faqMore = document.getElementById('faqMore');
if (faqMore) {
  faqMore.addEventListener('click', () => {
    const list = faqMore.closest('.faq-list');
    list.classList.add('is-open');
    faqMore.setAttribute('aria-expanded', 'true');
    const first = list.querySelector('.faq-extra summary');
    if (first) first.focus({ preventScroll: true });
  });
}
