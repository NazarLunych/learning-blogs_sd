function initProductBannerFunc() {
  const selectors = {
    swiper: ".js-product-banner-swiper",
    video: ".js-product-banner-video"
  };

  new Swiper(selectors.swiper, {
    direction: "horizontal",
    slidesPerView: 1,
    spaceBetween: 24,
    effect: "fade",
    navigation: {
      nextEl: ".product-banner__button-next",
      prevEl: ".product-banner__button-prev"
    },
    pagination: {
      el: ".swiper-pagination"
    },
    on: {
      slideChange: function () {
        const index = this.realIndex;
        const currentSlide = this.slides[index];
        const currentVideoEl = currentSlide?.querySelector(selectors.video);
        const prevVideoEl = this.clickedSlide?.querySelector(selectors.video);

        currentVideoEl && currentVideoEl.play();
        prevVideoEl && prevVideoEl.pause();
      }
    }
  });
}

initProductBannerFunc();
