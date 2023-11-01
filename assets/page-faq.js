function initFAQPage() {
  const faqAccordions = document.querySelectorAll(".js-faq-accordion");
  faqAccordions.length && faqAccordions.forEach((button) => {
    button.addEventListener("click", (e) => {
      const notAnswer = e.target.closest("div").dataset.target !== "answer";
      notAnswer && button.classList.toggle("faq__accordion--active");
    });
  });

  const changeActiveLink = (index) => {
    faqLinks.forEach((link, linkIndex) => link.classList.toggle("faq__btn--active", linkIndex === index));
  };

  let isHeaderHidden = false;
  const yOffset = 117;
  const header = document.querySelector(".section-header");
  const faqMenu = document.querySelector(".js-faq-menu");
  const faqLinks = document.querySelectorAll(".js-faq-links");
  faqLinks.length && faqLinks.forEach((link, index) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      setTimeout(() => {
        isHeaderHidden = header.classList.contains("shopify-section-header-hidden");
        faqMenu.classList.toggle("faq__menu--offset", !isHeaderHidden);
      }, 0);

      const targetElem = document.getElementById(link.dataset.target);
      if (targetElem) {
        const y = targetElem.getBoundingClientRect().top + window.scrollY - yOffset;
        window.scrollTo({top: y, behavior: "smooth"});
      }

      changeActiveLink(index);
    });
  });

  window.addEventListener("scroll", () => {
    isHeaderHidden = header.classList.contains("shopify-section-header-hidden");
    faqMenu.classList.toggle("faq__menu--offset", !isHeaderHidden);
  });
}

initFAQPage();