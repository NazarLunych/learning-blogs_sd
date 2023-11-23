function minicartFuncInit() {
  const selectors = {
    closeBtn: ".js-minicart-close-btn",
    contentContainer: ".js-minicart-container",
    productsContainer: ".js-minicart-products-container",
    openButton: ".js-minicart-open-button",
    minicart: ".js-minicart",
    productsCounter: ".js-minicart-counter",
    deleteBtn: ".js-minicart-delete-btn",
    subtotal: ".js-minicart-subtotal",
    cartItemsWrapper: ".js-minicart-items",
    cartItem: ".js-minicart-item",
    addToNoteBtn: ".js-minicart-add-note-btn",
    textarea: ".js-minicart-textarea",
    loader: ".js-minicart-loader",
    itemInfoBlock: ".js-minicart-item-info"
  };

  const classes = {
    minicartHidden: "minicart--hidden",
    textareaHidden: "minicart__textarea--hidden",
    hidden: "hidden"
  };

  function debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  }

  const productsContainer = document.querySelector(selectors.productsContainer);
  const loader = document.querySelector(selectors.loader);

  const toggleLoader = (isShown) => {
    productsContainer?.classList.toggle(classes.hidden, isShown);
    loader?.classList.toggle(classes.hidden, !isShown);
  };

  const countEl = document.querySelectorAll(selectors.productsCounter);

  const postDataHandler = (url, formData) => {
    const counter = countEl.length && countEl[[...countEl].findIndex((el) => el.dataset.itemId === formData.id)];

    fetch(window.Shopify.routes.root + url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    }).then((response) => {
      if (!response.ok) {
        return response.text().then(text => {
          throw new Error(text);
        });
      }

      return response.json();
    }).then(() => {
      updateData();
      counter.setAttribute("data-cart-quantity", counter.getAttribute("value"));
    }).catch((err) => {
      console.error(err);
      const itemsList = cartItemsWrapper.querySelectorAll(selectors.cartItem);
      itemsList.length && itemsList.forEach((item) => {
        if (formData.id === item.dataset.itemId) {
          const infoBlock = item.querySelector(selectors.itemInfoBlock);
          const {message} = JSON.parse(err.message);

          counter.setAttribute("value", counter.getAttribute("data-cart-quantity"));

          if (!infoBlock.innerHTML.includes(message)) {
            infoBlock.innerHTML += `<div style="color: var(--secondary-color-red)">${message}</div>`;
          }

          toggleLoader(false);
        }
      });
    });
  };

  const updateData = () => {
    fetch(window.location.pathname + `?section_id=minicart`)
      .then(res => res.text()).then((resText) => {
      const html = new DOMParser().parseFromString(resText, "text/html");
      const updatedCartItems = html.querySelector(selectors.cartItemsWrapper);
      const rootCartItems = document.querySelector(selectors.cartItemsWrapper);
      const updatedSubtotal = html.querySelector(selectors.subtotal);
      const rootSubtotal = document.querySelector(selectors.subtotal);

      if (updatedSubtotal && rootSubtotal) {
        rootSubtotal.textContent = updatedSubtotal.textContent;
      }

      if (updatedCartItems && rootCartItems) {
        rootCartItems.innerHTML = updatedCartItems.innerHTML;
      }

      toggleLoader(false);
    }).catch((err) => console.error(err));
  };

  const changeCountHandler = (formData) => {
    toggleLoader(true);
    postDataHandler("cart/change.js", formData);
  };

  const contentContainer = document.querySelector(selectors.contentContainer);
  const minicart = document.querySelector(selectors.minicart);

  const toggleMinicartVisibility = (isVisible) => {
    minicart && minicart.classList.toggle(classes.minicartHidden, !isVisible);
    document.getElementsByTagName("body")[0].style.overflow = isVisible ? "hidden" : "visible";
  };

  (contentContainer && minicart) && minicart.addEventListener("click", (e) => {
    if (!contentContainer.contains(e.target)) {
      toggleMinicartVisibility(false);
    }
  });

  const closeBtn = document.querySelector(selectors.closeBtn);
  closeBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    toggleMinicartVisibility(false);
  });

  const openButton = document.querySelector(selectors.openButton);
  openButton?.addEventListener("click", () => toggleMinicartVisibility(true));

  const cartItemsWrapper = document.querySelector(selectors.cartItemsWrapper);
  const cartItems = cartItemsWrapper.querySelectorAll(selectors.cartItem);

  cartItems.length && cartItems.forEach((item) => {
    const {itemId} = item.dataset;
    const counter = countEl.length && countEl[[...countEl].findIndex((el) => el.dataset.itemId === itemId)];

    const processChange = debounce(() => changeCountHandler({
      id: itemId,
      quantity: counter.getAttribute("value")
    }));

    if (cartItemsWrapper) {
      cartItemsWrapper.addEventListener("change", (e) => {
        if (itemId === e.target.dataset.itemId) {
          counter.setAttribute("value", e.target.value);
          processChange();
        }
      });

      cartItemsWrapper.addEventListener("click", (e) => {
        const {value} = e.target.dataset;

        e.preventDefault();

        if (itemId === e.target.closest(selectors.deleteBtn)?.dataset.itemId) {
          counter.setAttribute("value", "0");
          processChange();
        }

        const handleQuantityChange = (increment) => {
          const counterValue = +counter.getAttribute("value");
          const newValue = increment ? counterValue + 1 : counterValue - 1;

          counter.setAttribute("value", newValue.toString());
        };

        if (itemId === e.target.dataset.itemId && (value === "increment" || value === "decrement")) {
          handleQuantityChange(value === "increment");
          processChange();
        }
      });
    }
  });

  const addToNoteBtn = document.querySelector(selectors.addToNoteBtn);
  const note = document.querySelector(selectors.textarea);

  (addToNoteBtn && note) && addToNoteBtn.addEventListener("click", (e) => {
    e.preventDefault();
    note.classList.toggle(classes.textareaHidden);
  });

  note?.addEventListener("change", (e) => postDataHandler("cart/update.js", {note: e.target.value}));
}

minicartFuncInit();
