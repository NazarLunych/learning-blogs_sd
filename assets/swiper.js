let init = false;
let swiper;
let ourTeamSwiper;
const mediaQuery = window.matchMedia("(max-width: 990px)");

function initializeSwiper(selector, slidesPerView, spaceBetween, breakpoints) {
  return new Swiper(selector, {
    direction: "horizontal",
    slidesPerView: slidesPerView,
    breakpoints: breakpoints,
    spaceBetween: spaceBetween,
    pagination: {
      el: ".swiper-pagination",
    },
  });
}

function swiperCard() {
  if (mediaQuery.matches) {
    if (!init) {
      init = true;

      ourTeamSwiper = initializeSwiper(".js-our-team-swiper", "auto", 8);
      swiper = initializeSwiper(".js-swiper", 1, 16, {
        640: { slidesPerView: 2 },
      });
    }
  } else if (init) {
    swiper.destroy();
    ourTeamSwiper.destroy();
    init = false;
  }
}
swiperCard();
mediaQuery.addEventListener("change", swiperCard);
