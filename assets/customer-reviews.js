function initCustomerReviews() {
  new Swiper(".js-reviews-swiper", {
    direction: "horizontal",
    slidesPerView: 1,
    breakpoints: {
      768: {
        slidesPerView: 2
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
