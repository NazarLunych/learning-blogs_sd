function quickViewPopupInit() {
  const popup = document.querySelector(".js-quick-view-popup");
  const closeBtn = document.querySelector(".js-quick-view-popup-close-btn");

  const onPopupClose = () => {
    popup?.classList.add("quick-view-popup--hidden");
    document.getElementsByTagName("body")[0].style.overflow = "visible";
  };

  popup?.addEventListener("click", (e) => {
    (e.target === popup) && onPopupClose();
  });

  closeBtn?.addEventListener("click", onPopupClose);
}

quickViewPopupInit();
