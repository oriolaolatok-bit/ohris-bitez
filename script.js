const cart = new Map();
const cartDialog = document.querySelector("#cart-dialog");
const cartItems = document.querySelector("#cart-items");
const cartCount = document.querySelector("#cart-count");
const cartTotal = document.querySelector("#cart-total");
const checkoutButton = document.querySelector("#checkout-button");
const checkoutForm = document.querySelector("#checkout-form");
const checkoutResult = document.querySelector("#checkout-result");
const productCards = [...document.querySelectorAll(".product-card")];
const filterButtons = [...document.querySelectorAll(".filter-button")];

document.querySelector("#year").textContent = new Date().getFullYear();

function renderCart() {
  const items = [...cart.values()];
  const quantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  cartCount.textContent = quantity;
  cartTotal.textContent = `$${total.toFixed(2)}`;
  checkoutButton.disabled = items.length === 0;

  if (items.length === 0) {
    checkoutForm.hidden = true;
    cartItems.innerHTML = '<p class="empty-cart">Your bag is looking a little airy. Add a bake you love.</p>';
    checkoutResult.textContent = "";
    return;
  }

  cartItems.innerHTML = items.map((item) => `
    <div class="cart-item">
      <span class="cart-item-name">${item.name}</span>
      <span class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
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
    const { product, price } = button.dataset;
    const current = cart.get(product);
    cart.set(product, { name: product, price: Number(price), quantity: (current?.quantity ?? 0) + 1 });
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
  checkoutResult.textContent = "";
  renderCart();
});

document.querySelector("#open-cart").addEventListener("click", () => cartDialog.showModal());
document.querySelector("#close-cart").addEventListener("click", () => cartDialog.close());
cartDialog.addEventListener("click", (event) => {
  if (event.target === cartDialog) cartDialog.close();
});

checkoutButton.addEventListener("click", () => {
  checkoutForm.hidden = false;
  document.querySelector("#customer-name").focus();
});

checkoutForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!checkoutForm.reportValidity()) return;
  checkoutResult.textContent = "Thanks! This is a demo only—connect an order service before accepting real orders.";
});

renderCart();
