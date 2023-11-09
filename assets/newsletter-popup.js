function initNewsletterPopupFunc() {
  const selectors = {
    popup: ".js-newsletter-popup",
    popupCloseBtn: ".js-newsletter-popup-close",
    popupSubmitBtn: ".js-newsletter-popup-submit"
  };

  const classes = {
    popup: "js-newsletter-popup",
    hiddenPopup: "newsletter-popup--hidden"
  };

  const cookies = {
    dontShowPopup: "dont_show_popup"
  };

  const newsletterPopup = document.querySelector(selectors.popup);
  const {enable, cookieTime} = newsletterPopup.dataset;
  const isEnable = enable === "true";

  const getCookie = (cname) => {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  };

  const setCookie = (exdays) => {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    const expires = d.toUTCString();

    document.cookie = `${cookies.dontShowPopup}=${true}; expires=${expires}; path=/`;
  };

  const onPopupClose = (e) => {
    e.preventDefault();

    newsletterPopup.classList.add(classes.hiddenPopup);
    setCookie(cookieTime);
    document.getElementsByTagName("body")[0].style.overflow = "visible";
  };

  newsletterPopup && newsletterPopup.addEventListener("click", (e) => {
    if (e.target.classList.contains(classes.popup)) onPopupClose(e);
  });

  const dontShowPopup = getCookie(cookies.dontShowPopup) === "true";
  const {formSuccess, formErrors} = newsletterPopup.dataset;
  const isFormSuccess = formSuccess === "true";

  const getTimeoutTime = () => (isFormSuccess || formErrors) ? 0 : 4000;
  const timeoutTime = getTimeoutTime();

  if (isEnable) {
    if (!dontShowPopup || isFormSuccess || formErrors) {
      setTimeout(() => {
        newsletterPopup.classList.remove(classes.hiddenPopup);
        document.getElementsByTagName("body")[0].style.overflow = "hidden";
      }, timeoutTime);
    }
  }

  const closeBtns = document.querySelectorAll(selectors.popupCloseBtn);
  closeBtns.length && closeBtns.forEach((btn) => btn.addEventListener("click", onPopupClose));

  const submitBtn = document.querySelector(selectors.popupSubmitBtn);
  submitBtn && submitBtn.addEventListener("click", () => setCookie(cookieTime));
}

initNewsletterPopupFunc();
