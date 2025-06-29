import { localCards } from './data';
import type { Card } from './interface';

document.addEventListener("DOMContentLoaded", () => {
  const containerSelector = ".about__list";

  function generateCard(card: Card): string {
    return `
      <a class="about__item" href="#">
        <img class="about__icon" src="${card.icon}" alt="${card.title}">
        <h3 class="about__title">${card.title}</h3>
        <p class="about__subtitle">${card.subtitle}</p>
      </a>
    `;
  }

  function renderCards(containerSelector: string, cards: Card[]): void {
    const container = document.querySelector<HTMLElement>(containerSelector);
    if (!container) return console.error("Контейнер не найден");

    container.innerHTML = "";

    cards.forEach((card) => {
      const cardHTML = generateCard(card);
      container.innerHTML += cardHTML;
    });
  }
  renderCards(containerSelector, localCards);
  fetch("json/cards.json")
    .then((response) => {
      if (!response.ok) throw new Error("Не удалось загрузить данные");
      return response.json();
    })
    .then((data: Card[]) => {
      renderCards(containerSelector, data); 
    })
    .catch((error) => {
      console.error("Ошибка загрузки json.json:", error);
    });

  // --- Блок: Слайдер ---
  const slider = document.getElementById("autoSlider");
  if (slider) {
    const sliderInner = slider.querySelector<HTMLDivElement>(".slider-inner");
    const dotsContainer = slider.querySelector<HTMLDivElement>(".slider-dots");

    const images = ["images/grup.png", "images/foto-2.png", "images/foto1.png"];
    let currentIndex = 0;

    function updateSlide(): void {
      if (sliderInner) {
        sliderInner.style.backgroundImage = `url('${images[currentIndex]}')`;
      }
      updateDots();
    }

    function createDots(): void {
      images.forEach((_, index) => {
        const dot = document.createElement("span");
        dot.addEventListener("click", () => {
          currentIndex = index;
          updateSlide();
        });
        dotsContainer?.appendChild(dot);
      });
    }

    function updateDots(): void {
      const dots = dotsContainer?.querySelectorAll("span");
      dots?.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentIndex);
      });
    }

    function startSlider(): void {
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
  }
  const modal = document.getElementById("modal");
  const openModalBtns = document.querySelectorAll("[data-modal='open']");
  const closeModalBtn = modal?.querySelector(".modal__button--cancel");
  const overlay = modal?.querySelector(".modal__overlay");
  const form = modal?.querySelector("#modalForm") as HTMLFormElement | null;

  function showModal(): void {
    if (modal) {
      modal.style.display = "flex";
      document.body.style.overflow = "hidden";
    }
  }

  function hideModal(): void {
    if (modal) {
      modal.style.display = "none";
      document.body.style.overflow = "";
    }
  }

  openModalBtns.forEach((btn) => {
    btn.addEventListener("click", showModal);
  });

  closeModalBtn?.addEventListener("click", hideModal);
  overlay?.addEventListener("click", hideModal);

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Форма отправлена!");
    hideModal();
  });
  
  setTimeout(() => {
    const preloader = document.querySelector(".preloader");
    if (preloader instanceof HTMLElement) {
      preloader.style.opacity = "0";
      preloader.style.pointerEvents = "none";
      setTimeout(() => {
        preloader.remove();
      }, 500);
    }
  }, 5000);
});