document.addEventListener("DOMContentLoaded", () => {
  const containerSelector = ".about__list";
  const localCards = [
    {
      icon: "images/rast.png",
      title: "Professional Profile",
      subtitle:
        "We know finding the right job is stressful, so we've made it simple. It only takes a few minutes. Create a free portfolio on briefolio to show your best self and get discovered by recruiter",
    },
    {
      icon: "images/rast2.png",
      title: "Best Portfolio",
      subtitle:
        "We know finding the right job is stressful, so we've made it simple. It only takes a few minutes. Create a free portfolio on briefolio to show your best self and get discovered by recruiter",
    },
    {
      icon: "images/rast2.png",
      title: "Powerful Resume",
      subtitle:
        "We know finding the right job is stressful, so we've made it simple. It only takes a few minutes. Create a free portfolio on briefolio to show your best self and get discovered by recruiter",
    },
  ];

  let cardsData = [];

  function generateCard({ icon, title, subtitle }) {
    return `
      <a class="about__item" href="#">
        <h3 class="about__title">${title}</h3>
        <p class="about__subtitle">${subtitle}</p>
      </a>
    `;
  }

  function renderCards(containerSelector, cards) {
    const container = document.querySelector(containerSelector);
    if (!container) return console.error("Контейнер не найден");

    container.innerHTML = ""; 

    cards.forEach((card) => {
      const cardHTML = generateCard(card);
      container.innerHTML += cardHTML;
    });
  }

  fetch("json/cards.json")
    .then((response) => {
      if (!response.ok) throw new Error("Не удалось загрузить данные");
      return response.json();
    })
    .then((data) => {
      cardsData = data;
      renderCards(containerSelector, cardsData);
    })
    .catch((error) => {
      console.error("Ошибка загрузки json.json:", error);
      cardsData = [...localCards];
      renderCards(containerSelector, cardsData);
    });
});

document.addEventListener("DOMContentLoaded", () => {
  renderCards(".about__list", cards);
});
document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById('autoSlider');
  const sliderInner = slider.querySelector('.slider-inner');
  const dotsContainer = slider.querySelector('.slider-dots');

  const images = [
    'images/grup.png',
    'images/foto-2.png',
    'images/foto1.png' 
  ];

  let currentIndex = 0;

  function updateSlide() {
    sliderInner.style.backgroundImage = `url('${images[currentIndex]}')`;
    updateDots();
  }

  function createDots() {
    images.forEach((_, index) => {
      const dot = document.createElement('span');
      dot.addEventListener('click', () => {
        currentIndex = index;
        updateSlide();
      });
      dotsContainer.appendChild(dot);
    });
  }

  function updateDots() {
    const dots = dotsContainer.querySelectorAll('span');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }

  function startSlider() {
    setInterval(() => {
      currentIndex = (currentIndex + 1) % images.length;
      updateSlide();
    }, 3000); 
  }
  if (images.length > 0) {
    updateSlide();
    if (images.length > 1) {
      createDots();
      updateDots();
      startSlider();
    }
  }
});
document.addEventListener("DOMContentLoaded", () => {
  // Логин модальное окно
  const loginModal = document.getElementById('modal');
  const openLoginBtns = document.querySelectorAll('[data-modal="open"]');
  const closeLoginBtn = loginModal.querySelector('.modal__button--cancel');
  const overlayLogin = loginModal.querySelector('.modal__overlay');
  const formLogin = loginModal.querySelector('#modalForm');

  // Регистрация модальное окно
  const signupModal = document.getElementById('signupModal');
  const openSignupBtns = document.querySelectorAll('[data-modal="open-signup"]');
  const closeSignupBtn = signupModal.querySelector('.modal__button--cancel');
  const overlaySignup = signupModal.querySelector('.modal__overlay');
  const formSignup = signupModal.querySelector('#signupForm');


  // Функции для показа/скрытия окон
  function showLoginModal() {
    loginModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  function hideLoginModal() {
    loginModal.style.display = 'none';
    document.body.style.overflow = '';
  }

  function showSignupModal() {
    signupModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  function hideSignupModal() {
    signupModal.style.display = 'none';
    document.body.style.overflow = '';
  }

  // Обработчики событий для Login
  openLoginBtns.forEach(btn => {
    btn.addEventListener('click', showLoginModal);
  });

  closeLoginBtn.addEventListener('click', hideLoginModal);
  overlayLogin.addEventListener('click', hideLoginModal);

  formLogin.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Форма входа отправлена!');
    hideLoginModal();
  });


  // Обработчики событий для Sign Up
  openSignupBtns.forEach(btn => {
    btn.addEventListener('click', showSignupModal);
  });

  closeSignupBtn.addEventListener('click', hideSignupModal);
  overlaySignup.addEventListener('click', hideSignupModal);

  formSignup.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Форма регистрации отправлена!');
    hideSignupModal();
  });
});
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
      preloader.style.opacity = '0';
      preloader.style.pointerEvents = 'none'; 
      setTimeout(() => {
        preloader.remove();
      }, 500);
    }
  }, 5000); 
});