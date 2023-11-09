const selectors = {
  swiper: ".js-swiper",
  ourTeamSwiper: ".js-our-team-swiper",
  trendProductsSwiper: ".js-trend-products-swiper",
  shopTheLookSwiper: ".js-shop-the-look-swiper"
};
let swiper;
let ourTeamSwiper;
let trendProductsSwiper;
const mediaQueries = {
  largeScreen: window.matchMedia("(max-width: 990px)"),
  smallScreen: window.matchMedia("(max-width: 767px)")
};
const {largeScreen, smallScreen} = mediaQueries;

function initializeSwiper(selector, slidesPerView, spaceBetween, breakpoints) {
  return new Swiper(selector, {
    direction: "horizontal",
    slidesPerView: slidesPerView,
    breakpoints: breakpoints,
    spaceBetween: spaceBetween,
    cssMode: true,
    pagination: {
      el: ".swiper-pagination"
    }
  });
}

let largeScreenInit = false;

function swiperCardLarge() {
  if (largeScreen.matches) {
    if (!largeScreenInit) {
      largeScreenInit = true;
      ourTeamSwiper = initializeSwiper(selectors.ourTeamSwiper, "auto", 8);
      swiper = initializeSwiper(selectors.swiper, 1, 16, {
        640: {slidesPerView: 2}
      });
    }
  } else if (largeScreenInit) {
    swiper.destroy();
    ourTeamSwiper.destroy();
    largeScreenInit = false;
  }
}

let smallScreenInit = false;

function swiperCardSmall() {
  if (smallScreen.matches) {
    if (!smallScreenInit) {
      smallScreenInit = true;
      trendProductsSwiper = initializeSwiper(selectors.trendProductsSwiper, 1, 16);
    }
  } else if (smallScreenInit) {
    trendProductsSwiper.destroy();
    smallScreenInit = false;
  }
}

swiperCardLarge();
swiperCardSmall();
largeScreen.addEventListener("change", swiperCardLarge);
smallScreen.addEventListener("change", swiperCardSmall);

const shopTheLookSwiper = new Swiper(selectors.shopTheLookSwiper, {
  direction: "horizontal",
  slidesPerView: 1,
  spaceBetween: 24,
  navigation: {
    nextEl: ".shop-the-look__button-next",
    prevEl: ".shop-the-look__button-prev"
  },
  pagination: {
    el: ".swiper-pagination"
  }
});

const hotSpots = document.querySelectorAll(".js-hot-spot");

if (hotSpots.length) {
  hotSpots.forEach((button, index) => button.addEventListener("click", () => shopTheLookSwiper.slideTo(index)));
}
