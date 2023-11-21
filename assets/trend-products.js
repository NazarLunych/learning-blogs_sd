function quickViewSwiperInit() {
  const swiper = new Swiper(".js-swiper-small-img", {
    spaceBetween: 8,
    slidesPerView: 6,
    freeMode: true,
    watchSlidesProgress: true
  });

  new Swiper(".js-swiper-large-img", {
    spaceBetween: 10,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    thumbs: {
      swiper: swiper
    }
  });
}

function trendProductsFuncInit() {
  const selectors = {
    addToCartBtn: ".js-add-to-cart-button",
    hotSpot: ".js-trend-products-hot-spot",
    modal: ".js-hot-spot-modal",
    quickViewCnt: ".js-quick-view-popup-cnt",
    quickViewModal: ".js-quick-view-popup",
    quantity: ".js-quick-view-quantity",
    counter: ".js-quick-view-counter",
    loader: ".js-quick-view-popup-loader"
  };

  const hotSpotList = document.querySelectorAll(selectors.hotSpot);
  const hotSpotModalList = document.querySelectorAll(selectors.modal);
  const addToCartBtns = document.querySelectorAll(selectors.addToCartBtn);
  const quickViewCnt = document.querySelector(selectors.quickViewCnt);
  const quickViewModal = document.querySelector(selectors.quickViewModal);
  const loader = document.querySelector(selectors.loader);

  const toggleLoader = (loading) => loader?.classList.toggle("hidden", !loading);

  addToCartBtns.length && addToCartBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      toggleLoader(true);
      quickViewCnt.innerHTML = null;
      quickViewModal?.classList.remove("quick-view-popup--hidden");
      document.getElementsByTagName("body")[0].style.overflow = "hidden";

      btn.contains(e.target) && fetch(`/products/${e.target.dataset.productHandle}?view=quick-view`).then((response) => {
        if (!response.ok) {
          throw new Error("Error " + response.status);
        }

        return response.text();
      }).then((html) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const section = doc.querySelector(".js-quick-view-section");

        if (quickViewCnt && section) {
          quickViewCnt.innerHTML = section.innerHTML;
        }

        const counter = document.querySelector(selectors.counter);
        const quantity = document.querySelector(selectors.quantity);
        quantity?.addEventListener("click", (e) => {
          const {value} = e.target.dataset;

          if (!value) return;

          if (value === "increment") {
            counter.textContent = +counter.textContent + 1;
          } else if (+counter.textContent > 1) {
            counter.textContent = +counter.textContent - 1;
          }
        });

        quickViewSwiperInit();
      }).catch((err) => {
        console.error(err);
        quickViewCnt.innerHTML = "<div class='quick-view-cnt__error-message'>" + err.message + "</div>";
      }).finally(() => toggleLoader(false));
    });
  });

  const toggleHotSpotModal = (activeHotSpotIndex, hotSpotButton) => {
    hotSpotModalList.forEach((modal, modalIndex) => {
      const shouldShow = activeHotSpotIndex === modalIndex && !hotSpotButton.classList.contains("hot-spot--active");
      modal.classList.toggle("hidden", !shouldShow);
    });

    hotSpotList.forEach((el, index) => {
      const isActive = activeHotSpotIndex === index;
      el.classList.toggle("hot-spot--active", isActive && !el.classList.contains("hot-spot--active"));
    });
  };

  const closeHotSpotModal = (event) => {
    const isClickInsideModal = [...hotSpotModalList].some((modal) => modal.contains(event.target));
    const isClickOnHotSpotButton = [...hotSpotList].some((button) => button.contains(event.target));

    if (!isClickInsideModal && !isClickOnHotSpotButton) {
      hotSpotModalList.forEach((modal) => {
        modal.classList.add("hidden");
      });

      hotSpotList.forEach((el) => {
        el.classList.remove("hot-spot--active");
      });
    }
  };

  document.addEventListener("click", closeHotSpotModal);

  if (hotSpotList.length && hotSpotModalList.length) {
    hotSpotList.forEach((hotSpotButton, hotSpotIndex) => {
      hotSpotButton.addEventListener("click", (event) => {
        event.stopPropagation();
        toggleHotSpotModal(hotSpotIndex, hotSpotButton);
      });
    });
  }
}

trendProductsFuncInit();
