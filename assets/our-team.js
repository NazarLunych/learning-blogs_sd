const selectors = {
  modal: ".js-our-team-modal",
  readMoreBtn: ".js-our-team-read-more",
  closeModalBtn: ".js-our-team-close-modal",
};

const modal = document.querySelectorAll(selectors.modal);
const readMoreBtn = document.querySelectorAll(selectors.readMoreBtn);
const closeModalBtn = document.querySelectorAll(selectors.closeModalBtn);

const toggleModal = (index, isOpen) => {
  document.getElementsByTagName("body")[0].style.overflow = isOpen
    ? "hidden"
    : "visible";
  modal[index].classList.toggle("hidden", !isOpen);
};

const handleClick = (elements, value, clickCallback) => {
  elements?.forEach((el, index) => {
    el?.addEventListener("click", () => clickCallback(index, value));
  });
};

handleClick(readMoreBtn, true, toggleModal);
handleClick(closeModalBtn, false, toggleModal);
handleClick(modal, false, (index, value) => {
  if (modal[index] === event.target) {
    toggleModal(index, value);
  }
});
