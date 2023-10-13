let init = false;
let swiper;
const mediaQuery = window.matchMedia("(max-width: 990px)");

function swiperCard() {
  if (mediaQuery.matches) {
    if (!init) {
      init = true;
      swiper = new Swiper(".js-posts-swiper", {
        direction: "horizontal",
        slidesPerView: 1,
        breakpoints: {
          640: {
            slidesPerView: 2,
          },
        },
        spaceBetween: 16,
        pagination: {
          el: ".swiper-pagination",
        },
      });
    }
  } else if (init) {
    swiper.destroy();
    init = false;
  }
}
swiperCard();
mediaQuery.addEventListener("change", swiperCard);
