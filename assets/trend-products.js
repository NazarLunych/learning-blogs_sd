const hotSpotList = document.querySelectorAll(".js-trend-products-hot-spot");
const hotSpotModalList = document.querySelectorAll(".js-hot-spot-modal");

const toggleHotSpotModal = (activeHotSpotIndex, hotSpotButton) => {
  hotSpotModalList.forEach((modal, modalIndex) => {
    const shouldShow = activeHotSpotIndex === modalIndex && !hotSpotButton.classList.contains('hot-spot--active');
    modal.classList.toggle('hidden', !shouldShow);
  });

  hotSpotList.forEach((el, index) => {
    const isActive = activeHotSpotIndex === index;
    el.classList.toggle('hot-spot--active', isActive && !el.classList.contains('hot-spot--active'));
  });
};

if (hotSpotList.length && hotSpotModalList.length) {
  hotSpotList.forEach((hotSpotButton, hotSpotIndex) => {
    hotSpotButton.addEventListener('click', () => {
      toggleHotSpotModal(hotSpotIndex, hotSpotButton);
    });
  });
}