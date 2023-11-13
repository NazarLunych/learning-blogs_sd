function initCustomerReviews() {
  const reviewsSelector = ".js-reviews-swiper";
  const reviewsSwiper = document.querySelector(reviewsSelector);
  const {layout} = reviewsSwiper.dataset;
  let slidesPerView;

  switch (layout) {
    case "base":
    case "small_product":
      slidesPerView = 3;
      break;
    case "big_product":
      slidesPerView = 2;
      break;
    default:
      slidesPerView = 1;
  }

  new Swiper(reviewsSelector, {
    direction: "horizontal",
    slidesPerView: 1,
    breakpoints: {
      768: {
        slidesPerView: slidesPerView
      }
    },
    spaceBetween: 16,
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    }
  });
}

initCustomerReviews();
