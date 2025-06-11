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
        <img class="about__icon" src="${icon}" alt="${title}">
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
  const modal = document.getElementById('modal');
  const openModalBtns = document.querySelectorAll('[data-modal="open"]');
  const closeModalBtn = modal.querySelector('.modal__button--cancel');
  const overlay = modal.querySelector('.modal__overlay');
  const form = modal.querySelector('#modalForm');

 
  function showModal() {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; 
  }

  function hideModal() {
    modal.style.display = 'none';
    document.body.style.overflow = ''; 
  }

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', showModal);
  });

  closeModalBtn.addEventListener('click', hideModal);

  overlay.addEventListener('click', hideModal);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Форма отправлена!');
    hideModal();
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