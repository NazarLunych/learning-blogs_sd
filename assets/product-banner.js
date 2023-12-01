function initProductBannerFunc() {
  const selectors = {
    backgroundSwiper: ".js-product-banner-background-swiper",
    productSwiper: ".js-product-banner-product-swiper",
    video: ".js-product-banner-video"
  };

  const backgroundSwiper = new Swiper(selectors.backgroundSwiper, {
    effect: "fade",
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

  new Swiper(selectors.productSwiper, {
    effect: "fade",
    fadeEffect: {
      crossFade: true
    },
    navigation: {
      nextEl: ".product-banner__button-next",
      prevEl: ".product-banner__button-prev"
    },
    pagination: {
      el: ".swiper-pagination"
    },
    on: {
      slideChange: function () {
        backgroundSwiper.slideTo(this.realIndex);
      }
    }
  });
}

initProductBannerFunc();
