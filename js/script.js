const localMenuImage = '../Website1/makemystyle/images/logo.svg';

const menuItems = [
  { id: 1, category: 'Indian', name: 'Butter Chicken', description: 'Classic creamy and rich butter chicken.', price: 320, image: localMenuImage },
  { id: 2, category: 'Indian', name: 'Paneer Butter Masala', description: 'Soft paneer in creamy tomato gravy.', price: 260, image: localMenuImage },
  { id: 3, category: 'Indian', name: 'Dal Makhani', description: 'Slow-cooked lentils with buttery richness.', price: 220, image: localMenuImage },
  { id: 4, category: 'Indian', name: 'Veg Biryani', description: 'Aromatic rice with spiced vegetables.', price: 250, image: localMenuImage },
  { id: 5, category: 'Indian', name: 'Chicken Biryani', description: 'World-class biryani with tender chicken.', price: 320, image: localMenuImage },
  { id: 6, category: 'Indian', name: 'Tandoori Roti', description: 'Traditional Indian flatbread cooked fresh.', price: 30, image: localMenuImage },
  { id: 7, category: 'Chinese', name: 'Veg Noodles', description: 'Stir-fried noodles with vegetables.', price: 220, image: localMenuImage },
  { id: 8, category: 'Chinese', name: 'Hakka Noodles', description: 'Wok-tossed noodles with bold flavors.', price: 250, image: localMenuImage },
  { id: 9, category: 'Chinese', name: 'Chilli Paneer', description: 'Crispy paneer tossed in spicy sauce.', price: 240, image: localMenuImage },
  { id: 10, category: 'Chinese', name: 'Chicken Manchurian', description: 'Tangy and spicy Indo-Chinese favorite.', price: 280, image: localMenuImage },
  { id: 11, category: 'Chinese', name: 'Fried Rice', description: 'Classic fried rice with savory spice.', price: 230, image: localMenuImage },
  { id: 12, category: 'Chinese', name: 'Spring Rolls', description: 'Crispy rolls served with a sweet dip.', price: 180, image: localMenuImage },
  { id: 13, category: 'Continental', name: 'Grilled Chicken', description: 'Juicy grilled chicken with herbs.', price: 450, image: localMenuImage },
  { id: 14, category: 'Continental', name: 'White Sauce Pasta', description: 'Smooth creamy white sauce pasta.', price: 320, image: localMenuImage },
  { id: 15, category: 'Continental', name: 'Alfredo Pasta', description: 'Classic Alfredo pasta with parmesan.', price: 340, image: localMenuImage },
  { id: 16, category: 'Continental', name: 'Garlic Bread', description: 'Golden toasted bread with garlic butter.', price: 180, image: localMenuImage },
  { id: 17, category: 'Continental', name: 'Veg Burger', description: 'Veg burger topped with fresh sauce.', price: 250, image: localMenuImage },
  { id: 18, category: 'Continental', name: 'Chicken Burger', description: 'Tender chicken burger with cheese.', price: 320, image: localMenuImage },
  { id: 19, category: 'Desserts', name: 'Gulab Jamun', description: 'Warm syrup-soaked Indian dessert.', price: 120, image: localMenuImage },
  { id: 20, category: 'Desserts', name: 'Rasmalai', description: 'Creamy saffron dessert with soft cheese.', price: 140, image: localMenuImage },
  { id: 21, category: 'Desserts', name: 'Brownie', description: 'Rich chocolate brownie with fudgy texture.', price: 180, image: localMenuImage },
  { id: 22, category: 'Desserts', name: 'Chocolate Cake', description: 'Moist and indulgent chocolate cake.', price: 220, image: localMenuImage },
  { id: 23, category: 'Desserts', name: 'Ice Cream Sundae', description: 'Loaded sundae with toppings and cream.', price: 190, image: localMenuImage },
  { id: 24, category: 'Mocktails', name: 'Virgin Mojito', description: 'Minty citrus mocktail with fresh lime.', price: 180, image: localMenuImage },
  { id: 25, category: 'Mocktails', name: 'Blue Lagoon', description: 'Cool blue mocktail with citrus sparkle.', price: 220, image: localMenuImage },
  { id: 26, category: 'Mocktails', name: 'Watermelon Cooler', description: 'Refreshing watermelon mocktail.', price: 190, image: localMenuImage },
  { id: 27, category: 'Mocktails', name: 'Mint Lemonade', description: 'Fresh mint and lemon blend.', price: 160, image: localMenuImage },
  { id: 28, category: 'Mocktails', name: 'Fruit Punch', description: 'Mixed fruit punch with vibrant flavor.', price: 210, image: localMenuImage }
];

const state = {
  selectedCategory: 'All',
  searchTerm: '',
  cart: JSON.parse(localStorage.getItem('urbanTasteCart') || '[]'),
};

const categoryOrder = ['Indian', 'Chinese', 'Continental', 'Desserts', 'Mocktails'];
const categoryLabels = {
  Indian: 'Indian Food',
  Chinese: 'Chinese Food',
  Continental: 'Continental',
  Desserts: 'Desserts',
  Mocktails: 'Mocktails',
};

const menuGrid = document.getElementById('menuGrid');
const cartList = document.getElementById('cartList');
const subtotalEl = document.getElementById('subtotal');
const gstEl = document.getElementById('gst');
const grandTotalEl = document.getElementById('grandTotal');
const cartCountEl = document.getElementById('cartCount');
const searchInput = document.getElementById('searchInput');
const categoryButtons = document.querySelectorAll('[data-category]');
const cartDrawer = document.getElementById('cartDrawer');
const overlay = document.getElementById('overlay');
const orderForm = document.getElementById('orderForm');
const orderModal = new bootstrap.Modal(document.getElementById('checkoutModal'));
const preloader = document.getElementById('preloader');
const themeToggle = document.getElementById('themeToggle');

function saveCart() {
  localStorage.setItem('urbanTasteCart', JSON.stringify(state.cart));
}

function renderMenu() {
  const filtered = menuItems.filter(item => {
    const categoryMatch = state.selectedCategory === 'All' || item.category === state.selectedCategory;
    const searchMatch = item.name.toLowerCase().includes(state.searchTerm.toLowerCase()) || item.category.toLowerCase().includes(state.searchTerm.toLowerCase());
    return categoryMatch && searchMatch;
  });

  if (!filtered.length) {
    menuGrid.innerHTML = '<div class="col-12 text-center text-white py-4">No menu items found.</div>';
    return;
  }

  const sections = categoryOrder.map(category => {
    const items = filtered.filter(item => item.category === category);
    if (!items.length) return '';

    return `
      <div class="col-12 mb-4">
        <div class="category-section">
          <h3 class="menu-group-title">${categoryLabels[category]}</h3>
          <div class="row g-4">
            ${items.map(item => `
              <div class="col-lg-4 col-md-6 col-12">
                <div class="card-food h-100">
                  <img src="${item.image}" alt="${item.name}">
                  <div class="card-body">
                    <div class="item-name">${item.name}</div>
                    <p class="item-desc">${item.description}</p>
                    <div class="price-row">
                      <span class="fw-bold">₹${item.price}</span>
                      <div class="qty-box">
                        <button type="button" data-action="decrease" data-id="${item.id}">-</button>
                        <span class="qty-value" id="qty-${item.id}">${getQty(item.id)}</span>
                        <button type="button" data-action="increase" data-id="${item.id}">+</button>
                      </div>
                    </div>
                    <div class="d-grid mt-3">
                      <button class="btn btn-dark w-100 add-cart-btn" data-id="${item.id}">Add To Cart</button>
                    </div>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }).join('');

  menuGrid.innerHTML = sections;
}

function getQty(itemId) {
  const existing = state.cart.find(entry => entry.id === itemId);
  return existing ? existing.quantity : 0;
}

function addToCart(itemId) {
  const item = menuItems.find(menuItem => menuItem.id === itemId);
  if (!item) return;

  const existing = state.cart.find(entry => entry.id === itemId);
  if (existing) {
    existing.quantity += 1;
  } else {
    state.cart.push({ ...item, quantity: 1 });
  }
  saveCart();
  renderCart();
  renderMenu();
}

function updateQuantity(itemId, delta) {
  const existing = state.cart.find(entry => entry.id === itemId);
  if (!existing) return;
  existing.quantity += delta;
  if (existing.quantity <= 0) {
    state.cart = state.cart.filter(entry => entry.id !== itemId);
  }
  saveCart();
  renderCart();
  renderMenu();
}

function removeItem(itemId) {
  state.cart = state.cart.filter(entry => entry.id !== itemId);
  saveCart();
  renderCart();
  renderMenu();
}

function calculateTotals() {
  const subtotal = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const gst = subtotal * 0.05;
  const grandTotal = subtotal + gst;
  subtotalEl.textContent = `₹${subtotal}`;
  gstEl.textContent = `₹${gst.toFixed(2)}`;
  grandTotalEl.textContent = `₹${grandTotal.toFixed(2)}`;
  cartCountEl.textContent = state.cart.reduce((sum, item) => sum + item.quantity, 0);
}

function renderCart() {
  if (!state.cart.length) {
    cartList.innerHTML = '<div class="text-muted text-center">Your cart is empty.</div>';
  } else {
    cartList.innerHTML = state.cart.map(item => `
      <div class="cart-item">
        <div>
          <strong>${item.name}</strong><br>
          <small>Qty: ${item.quantity} • ₹${item.price}</small>
        </div>
        <div class="actions">
          <button class="btn btn-sm btn-outline-light" data-remove-id="${item.id}">Remove</button>
        </div>
      </div>
    `).join('');
  }
  calculateTotals();
}

function clearCart() {
  state.cart = [];
  saveCart();
  renderCart();
  renderMenu();
}

function validateMobile(number) {
  return /^\d{10}$/.test(number);
}

function toggleCart(show) {
  cartDrawer.classList.toggle('open', show);
  overlay.classList.toggle('show', show);
}

function handleOrderSubmit(event) {
  event.preventDefault();

  const name = document.getElementById('customerName').value.trim();
  const mobile = document.getElementById('mobileNumber').value.trim();
  const table = document.getElementById('tableNumber').value.trim();
  if (!name || !mobile || !table) {
    alert('Please fill in Name, Mobile Number, and Table Number.');
    return;
  }
  if (!validateMobile(mobile)) {
    alert('Mobile Number must be 10 digits.');
    return;
  }

  if (!state.cart.length) {
    alert('Please add at least one item to cart before checkout.');
    return;
  }

  const orderNumber = `ORD-2026-${String(Math.floor(Math.random() * 900) + 100)}`;
  document.getElementById('confirmationOrder').textContent = orderNumber;
  document.getElementById('confirmationTime').textContent = '20 Minutes';
  orderModal.hide();
  document.getElementById('successModal').showModal();
  clearCart();
  orderForm.reset();
}

function bindEvents() {
  document.addEventListener('click', (event) => {
    const addButton = event.target.closest('.add-cart-btn');
    const removeButton = event.target.closest('[data-remove-id]');
    const actionButton = event.target.closest('[data-action]');

    if (addButton) addToCart(Number(addButton.dataset.id));
    if (removeButton) removeItem(Number(removeButton.dataset.removeId));
    if (actionButton) {
      const id = Number(actionButton.dataset.id);
      const delta = actionButton.dataset.action === 'increase' ? 1 : -1;
      updateQuantity(id, delta);
    }
  });

  categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
      state.selectedCategory = button.dataset.category;
      renderMenu();
      categoryButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
    });
  });

  searchInput.addEventListener('input', (event) => {
    state.searchTerm = event.target.value;
    renderMenu();
  });

  const cartToggleButtons = [document.getElementById('cartToggle'), document.getElementById('cartToggleBottom')];
  cartToggleButtons.forEach(button => button?.addEventListener('click', () => toggleCart(true)));
  document.getElementById('closeCart').addEventListener('click', () => toggleCart(false));
  overlay.addEventListener('click', () => toggleCart(false));
  document.getElementById('clearCart').addEventListener('click', clearCart);
  document.getElementById('checkoutBtn').addEventListener('click', () => orderModal.show());
  document.getElementById('placeOrderBtn').addEventListener('click', handleOrderSubmit);
  document.getElementById('closeSuccess').addEventListener('click', () => document.getElementById('successModal').close());
  themeToggle.addEventListener('click', () => document.body.classList.toggle('dark-theme'));
}

window.addEventListener('load', () => {
  renderMenu();
  renderCart();
  bindEvents();
});
