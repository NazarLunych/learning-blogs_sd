function initCustomPredictiveSearchFunc() {
  const selectors = {
    searchPopup: ".js-custom-predictive-search",
    openButton: ".js-custom-predictive-search-open-button",
    closeButton: ".js-custom-predictive-search-close-button",
    searchInput: ".js-custom-predictive-search-input",
    content: ".js-custom-predictive-search-content",
    loader: ".js-custom-predictive-search-loader",
    tab: ".js-custom-predictive-search-tab",
    productsContainer: ".js-custom-predictive-search-products-container",
    clearInputButton: ".js-custom-predictive-search-clear-input"
  };

  const classes = {
    popupHidden: "custom-predictive-search--hidden",
    hidden: "hidden",
    activeTab: "custom-predictive-search__tab--active"
  };

  const debounce = (func) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), 300);
    };
  };

  const searchPopup = document.querySelector(selectors.searchPopup);
  const toggleSearchPopupVisibility = (isVisible) => {
    searchPopup && searchPopup.classList.toggle(classes.popupHidden, !isVisible);
    document.getElementsByTagName("body")[0].style.overflow = isVisible ? "hidden" : "visible";
  };

  const closeButton = document.querySelector(selectors.closeButton);
  closeButton?.addEventListener("click", () => toggleSearchPopupVisibility(false));

  const openButton = document.querySelector(selectors.openButton);
  openButton?.addEventListener("click", () => toggleSearchPopupVisibility(true));

  searchPopup?.addEventListener("click", (e) => {
    e.target.contains(searchPopup) && toggleSearchPopupVisibility(false);
  });

  const contentSection = document.querySelector(selectors.content);
  const loader = document.querySelector(selectors.loader);

  const toggleLoaderVisibility = (isLoading) => {
    if (contentSection && loader) {
      contentSection.classList.toggle(classes.hidden, isLoading);
      loader.classList.toggle(classes.hidden, !isLoading);
    }
  };

  const getSearchResults = (searchInput) => {
    toggleLoaderVisibility(true);

    fetch(`/search/suggest?q=${searchInput}&resources[type]=query,product,collection,page,article&section_id=custom-predictive-search`).then((response) => {
      if (!response.ok) {
        return response.text().then(text => {
          throw new Error(text);
        });
      }

      return response.text();
    }).then((text) => {
      const parsedData = new DOMParser().parseFromString(text, "text/html");
      const updatedContentSection = parsedData.querySelector(selectors.content);

      if (contentSection && updatedContentSection) {
        contentSection.innerHTML = updatedContentSection.innerHTML;
      }

      const tabs = document.querySelectorAll(selectors.tab);
      tabs.length && [...tabs].every((tab) => {
        if (!tab.disabled) {
          tab.classList.add(classes.activeTab);
          return false;
        }

        return true;
      });

      const productsContainers = document.querySelectorAll(selectors.productsContainer);
      const activeTab = [...tabs].find((tab) => tab.classList.contains(classes.activeTab));

      if (activeTab) {
        const tabText = activeTab.textContent.toLowerCase().trim();

        [...productsContainers].forEach((container) => {
          container.classList.toggle(classes.hidden, container.dataset.tabValue !== tabText);
        });
      }
    }).catch((err) => {
      console.error(err.message);

      if (contentSection) {
        contentSection.innerHTML = `<div class="custom-predictive-search__error">${err.message}</div>`;
      }
    }).finally(() => toggleLoaderVisibility(false));
  };

  const searchInput = document.querySelector(selectors.searchInput);

  const processChange = debounce(() => {
    if (searchInput.value.length) {
      getSearchResults(searchInput.value);
      return;
    }

    contentSection.innerHTML = "";
  });

  searchInput?.addEventListener("input", processChange);

  const clearInputButton = document.querySelector(selectors.clearInputButton);
  (clearInputButton && searchInput) && clearInputButton.addEventListener("click", () => {
    searchInput.value = "";
    contentSection.innerHTML = "";
  });

  const content = document.querySelector(selectors.content);
  content?.addEventListener("click", (e) => {
    const tabs = document.querySelectorAll(selectors.tab);
    const productsContainers = document.querySelectorAll(selectors.productsContainer);
    const isClickOnTab = [...tabs].some((tab) => tab === e.target);

    if (isClickOnTab) {
      tabs.length && tabs.forEach((tab) => {
        tab.classList.toggle(classes.activeTab, tab.contains(e.target));
      });

      productsContainers.length && productsContainers.forEach((container) => {
        container.classList.toggle(classes.hidden, container.dataset.tabValue !== e.target.textContent.trim().toLowerCase());
      });
    }
  });
}

initCustomPredictiveSearchFunc();
