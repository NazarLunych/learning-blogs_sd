function trendProductsFuncInit() {
  const hotSpotList = document.querySelectorAll(".js-trend-products-hot-spot");
  const hotSpotModalList = document.querySelectorAll(".js-hot-spot-modal");

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
