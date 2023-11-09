const selectors = {
  tab: ".js-story-telling-tab",
  cards: ".js-story-telling-cards"
};

const classes = {
  activeTab: "story-telling__tab--active",
  hidden: "hidden"
};

const tabs = document.querySelectorAll(selectors.tab);
const cards = document.querySelectorAll(selectors.cards);

const onTabClick = (tab) => {
  const {tabIndex} = tab.dataset;

  tabs.forEach((el, index) => {
    const activeIndex = index + 1;
    el.classList.toggle(classes.activeTab, +tabIndex === activeIndex);
  });

  cards.forEach((card) => {
    card.classList.toggle(classes.hidden, tabIndex !== card.dataset.cardIndex);
  });
};

if (tabs.length && cards.length) {
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => onTabClick(tab));
  });
}