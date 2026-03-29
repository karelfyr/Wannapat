// ===== Person Data =====
const people = {
  chan: {
    name: 'Chan Wannapat',
    img: 'images/about-chan.jpg',
    bio: 'Chan Wannapat (She/Her). Is a Thai singer, performer and vocal coach. She is pursuing her dream of performing arts in New York City. As a proud Thai diaspora, she embodies positivity with her bright smile. She holds an MM in Musical Theatre Vocal Performance from Arizona State University, sponsored by a Fulbright Scholarship. She is the voice of Mirabel in Disney\'s Encanto Thailand. Chan\'s favorite roles include Natasha from Natasha, Pierre and The Great Comet of 1812 (ASU), Adara from Luna The Immersive Musical (Castscape, Thailand), and ensemble and sub-lead roles in many Ratchadalai Theatre\'s original productions (Thailand). This life is so short, let\'s live happy, and share love with the world.',
    actionLabel: 'See on Instagram',
    actionUrl: 'https://www.instagram.com/chan_wannapat'
  },
  angela: {
    name: 'Angela Dixon',
    img: 'images/about-angela.jpg',
    bio: 'Angela Dixon ฟ้า (\'sky\' in Thai) is absolutely thrilled to be bringing percussion to the stage for her amazing, super talented, and dear friend Chan. As a multi-instrumentalist, singer, and theater artist based in NYC, Notable credits include playing percussion for the interview taping of Justice Ketanji Brown Jackson at the National Archives, and roles in productions such as Annie with Rhinebeck Theatre Society and The Diamond with Peoples Theater Company. Angela is also a songwriter, with original compositions that explore themes of grief, loss, and identity. When not on stage, Angela teaches music and theater to elementary students in the Bronx, nurturing the next generation of artists.',
    actionLabel: 'See on Instagram',
    actionUrl: 'https://www.instagram.com/angeladixonmusic'
  },
  eli: {
    name: 'Eli Weary',
    img: 'images/about-eli.jpg',
    bio: 'Eli Weary is an actor and instrumentalist based in NYC. He enjoys both sides of the stage with regional theatre credits and years of experience in the pit; whether it be as a cellist, guitarist, bassist or conductor. He is grateful to his wife and family for their continued support.',
    actionLabel: 'See on Instagram',
    actionUrl: 'https://www.instagram.com/ez_weary/'
  }
};

// ===== DOM Elements =====
const hamburgerBtn = document.getElementById('hamburgerBtn');
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
const readMoreBtns = document.querySelectorAll('.btn-read-more[data-person]');
const thaiBtnMenu = document.getElementById('thaiBtnMenu');
const thaiModal = document.getElementById('thaiModal');
const thaiModalBackdrop = document.getElementById('thaiModalBackdrop');
const thaiModalCloseBtn = document.getElementById('thaiModalCloseBtn');

// ===== Menu =====
function openMenu() {
  menuOverlay.classList.add('open');
  document.body.classList.add('menu-open');
}
function closeMenu() {
  menuOverlay.classList.remove('open');
  document.body.classList.remove('menu-open');
}

const floatingHamburgerBtn = document.getElementById('floatingHamburgerBtn');

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

// ===== Modal =====
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
  btn.addEventListener('click', () => {
    openModal(btn.dataset.person);
  });
});

modalCloseBtn.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', closeModal);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (modal.classList.contains('active')) closeModal();
    if (thaiModal.classList.contains('active')) closeThaiModal();
    if (menuOverlay.classList.contains('open')) closeMenu();
  }
});

// ===== Thai Support Modal =====
function openThaiModal() {
  closeMenu();
  setTimeout(() => {
    thaiModal.classList.add('active');
    thaiModalBackdrop.classList.add('active');
    document.body.classList.add('modal-open');
  }, 350);
}
function closeThaiModal() {
  thaiModal.classList.remove('active');
  thaiModalBackdrop.classList.remove('active');
  document.body.classList.remove('modal-open');
}

thaiBtnMenu.addEventListener('click', openThaiModal);
thaiModalCloseBtn.addEventListener('click', closeThaiModal);
thaiModalBackdrop.addEventListener('click', closeThaiModal);

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
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('.animate-in').forEach(el => {
  observer.observe(el);
});
