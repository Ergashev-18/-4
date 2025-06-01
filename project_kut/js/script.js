const cards = {
  card_1: {
    icon: "images/rast.png",
    title: "Professional Profile",
    subtitle:
      "We know finding the right job is stressful, so we've made it simple. It only takes a few minutes. Create a free portfolio on briefolio to show your best self and get discovered by recruiter.",
  },
  card_2: {
    icon: "images/rast2.png",
    title: "Best Portfolio",
    subtitle:
      "We know finding the right job is stressful, so we've made it simple. It only takes a few minutes. Create a free portfolio on briefolio to show your best self and get discovered by recruiter.",
  },
  card_3: {
    icon: "images/rast2.png",
    title: "Powerful Resume",
    subtitle:
      "We know finding the right job is stressful, so we've made it simple. It only takes a few minutes. Create a free portfolio on briefolio to show your best self and get discovered by recruiter.",
  },
};

function getCardData(cardKey) {
  return cards[cardKey];
}

function generateCardTemplate({ icon, title, subtitle }) {
  return `
    <a class="about__item" href="#">
      <img class="about__icon" src="${icon}" alt="${title}">
      <h3 class="about__title">${title}</h3>
      <p class="about__subtitle">${subtitle}</p>
    </a>
  `;
}

function renderCards(containerSelector, cards) {
  const container = document.querySelector(containerSelector);
  if (!container) return console.error("Контейнер не найден");

  Object.keys(cards).forEach((cardKey) => {
    const cardData = getCardData(cardKey);
    const cardHTML = generateCardTemplate(cardData);
    container.innerHTML += cardHTML;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderCards(".about__list", cards);
});
document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById('autoSlider');
  const sliderInner = slider.querySelector('.slider-inner');
  const dotsContainer = slider.querySelector('.slider-dots');

  // Массив путей к изображениям
  const images = [
    'images/grup.png',
    'images/black1.png',
    'images/another-image.jpg' // добавь свои
  ];

  let currentIndex = 0;

  // Функция обновления фона
  function updateSlide() {
    sliderInner.style.backgroundImage = `url('${images[currentIndex]}')`;
    updateDots();
  }

  // Функция создания точек
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

  // Функция обновления активной точки
  function updateDots() {
    const dots = dotsContainer.querySelectorAll('span');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }

  // Автоматическая смена слайда
  function startSlider() {
    setInterval(() => {
      currentIndex = (currentIndex + 1) % images.length;
      updateSlide();
    }, 3000); // Каждые 3 секунды
  }

  // Инициализация
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
  const modal = document.getElementById('modal');
  const openModalBtns = document.querySelectorAll('[data-modal="open"]');
  const closeModalBtn = modal.querySelector('.modal__button--cancel');
  const overlay = modal.querySelector('.modal__overlay');
  const form = modal.querySelector('#modalForm');

  // Функция открытия модального окна
  function showModal() {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Отключаем скролл
  }

  // Функция закрытия модального окна
  function hideModal() {
    modal.style.display = 'none';
    document.body.style.overflow = ''; // Возвращаем скролл
  }

  // Обработчики событий
  openModalBtns.forEach(btn => {
    btn.addEventListener('click', showModal);
  });

  closeModalBtn.addEventListener('click', hideModal);

  overlay.addEventListener('click', hideModal);

  // Обработка отправки формы
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Форма отправлена!');
    hideModal();
  });
});
document.addEventListener("DOMContentLoaded", () => {
  // Запускаем скрытие прелоадера через 1 секунду
  setTimeout(() => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
      // Плавное скрытие
      preloader.style.opacity = '0';
      preloader.style.pointerEvents = 'none'; // Отключаем взаимодействие
      // Убираем полностью из DOM через время анимации
      setTimeout(() => {
        preloader.remove();
      }, 500);
    }
  }, 5000); // Задержка перед скрытием (в миллисекундах)
});