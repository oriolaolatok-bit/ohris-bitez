const cart = new Map();
const cartDialog = document.querySelector("#cart-dialog");
const cartItems = document.querySelector("#cart-items");
const cartCount = document.querySelector("#cart-count");
const checkoutButton = document.querySelector("#checkout-button");
const productCards = [...document.querySelectorAll(".product-card")];
const filterButtons = [...document.querySelectorAll(".filter-button")];

document.querySelector("#year").textContent = new Date().getFullYear();

function renderCart() {
  const items = [...cart.values()];
  const quantity = items.reduce((sum, item) => sum + item.quantity, 0);

  cartCount.textContent = quantity;
  const cartIsEmpty = items.length === 0;
  checkoutButton.setAttribute("aria-disabled", String(cartIsEmpty));
  checkoutButton.tabIndex = cartIsEmpty ? -1 : 0;

  if (cartIsEmpty) {
    cartItems.innerHTML = '<p class="empty-cart">Your bag is looking a little airy. Add a bake you love.</p>';
    return;
  }

  cartItems.innerHTML = items.map((item) => `
    <div class="cart-item">
      <span class="cart-item-name">${item.name}</span>
      <div class="cart-item-controls">
        <button class="quantity-button" type="button" data-action="decrease" data-product="${item.name}" aria-label="Remove one ${item.name}">−</button>
        <span>Qty ${item.quantity}</span>
        <button class="quantity-button" type="button" data-action="increase" data-product="${item.name}" aria-label="Add one ${item.name}">+</button>
      </div>
      <button class="remove-item" type="button" data-action="remove" data-product="${item.name}">Remove</button>
    </div>
  `).join("");
}

document.querySelectorAll(".add-button").forEach((button) => {
  button.addEventListener("click", () => {
    const { product } = button.dataset;
    const current = cart.get(product);
    cart.set(product, { name: product, quantity: (current?.quantity ?? 0) + 1 });
    renderCart();
    button.querySelector("span").textContent = "✓";
    window.setTimeout(() => { button.querySelector("span").textContent = "+"; }, 800);
  });
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter;
    filterButtons.forEach((filterButton) => {
      const isSelected = filterButton === button;
      filterButton.classList.toggle("is-active", isSelected);
      filterButton.setAttribute("aria-pressed", String(isSelected));
    });
    productCards.forEach((card) => {
      const categories = card.dataset.category.split(" ");
      card.hidden = selectedFilter !== "all" && !categories.includes(selectedFilter);
    });
  });
});

cartItems.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;
  const { action, product } = button.dataset;
  const item = cart.get(product);
  if (!item) return;

  if (action === "remove" || (action === "decrease" && item.quantity === 1)) {
    cart.delete(product);
  } else if (action === "decrease") {
    item.quantity -= 1;
  } else if (action === "increase") {
    item.quantity += 1;
  }
  renderCart();
});

document.querySelector("#open-cart").addEventListener("click", () => cartDialog.showModal());
document.querySelector("#close-cart").addEventListener("click", () => cartDialog.close());
cartDialog.addEventListener("click", (event) => {
  if (event.target === cartDialog) cartDialog.close();
});

checkoutButton.addEventListener("click", (event) => {
  if (checkoutButton.getAttribute("aria-disabled") === "true") {
    event.preventDefault();
  }
});

renderCart();
