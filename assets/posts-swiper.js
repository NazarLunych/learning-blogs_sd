let init = false;
let swiper;
function swiperCard() {
  if (window.innerWidth <= 1350) {
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
window.addEventListener("resize", swiperCard);
