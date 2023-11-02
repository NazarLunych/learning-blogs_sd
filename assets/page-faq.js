function initFAQPage() {
  const selectors = {
    faqAccordion: ".js-faq-accordion",
    sectionHeader: ".section-header",
    faqMenu: ".js-faq-menu",
    faqLinks: ".js-faq-links"
  };

  const classes = {
    faqAccordionActive: "faq__accordion--active",
    faqBtnActive: "faq__btn--active",
    sectionHeaderHidden: "shopify-section-header-hidden",
    faqMenuOffset: "faq__menu--offset"
  };

  const faqAccordions = document.querySelectorAll(selectors.faqAccordion);
  faqAccordions.length && faqAccordions.forEach((button) => {
    button.addEventListener("click", (e) => {
      const notAnswer = e.target.closest("div").dataset.target !== "answer";
      notAnswer && button.classList.toggle(classes.faqAccordionActive);
    });
  });

  const changeActiveLink = (index) => {
    faqLinks.forEach((link, linkIndex) => link.classList.toggle(classes.faqBtnActive, linkIndex === index));
  };

  let isHeaderHidden = false;
  const yOffset = 117;
  const header = document.querySelector(selectors.sectionHeader);
  const faqMenu = document.querySelector(selectors.faqMenu);
  const faqLinks = document.querySelectorAll(selectors.faqLinks);
  faqLinks.length && faqLinks.forEach((link, index) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      setTimeout(() => {
        isHeaderHidden = header.classList.contains(classes.sectionHeaderHidden);
        faqMenu.classList.toggle(classes.faqMenuOffset, !isHeaderHidden);
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
    isHeaderHidden = header.classList.contains(classes.sectionHeaderHidden);
    faqMenu.classList.toggle(classes.faqMenuOffset, !isHeaderHidden);
  });
}

initFAQPage();