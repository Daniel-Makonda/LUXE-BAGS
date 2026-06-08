let cart = [];

// Toggles the Cart Sidebar Open or Closed
function toggleCart(open) {
    const sidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('modal-overlay');
    if (open) {
        sidebar.classList.add('active');
        overlay.classList.add('active');
    } else {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
    }
}

// Controls the Login System Popup Modals
function openLoginModal() {
    document.getElementById('modal-overlay').classList.add('active');
    document.getElementById('login-modal').classList.add('active');
}

function closeLoginModal() {
    document.getElementById('login-modal').classList.remove('active');
    document.getElementById('modal-overlay').classList.remove('active');
}

function closeAllOverlays() {
    toggleCart(false);
    closeLoginModal();
}

function executeLogin(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const username = email.split('@')[0];
    document.getElementById('user-display').innerText = username.charAt(0).toUpperCase() + username.slice(1);
    closeLoginModal();
}

// Shopping Cart Core Logic Engine
function addToCart(name, price) {
    const index = cart.findIndex(item => item.name === name);
    if (index > -1) {
        cart[index].quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    renderCart();
    toggleCart(true);
}

function removeCartItem(index) {
    cart.splice(index, 1);
    renderCart();
}

function renderCart() {
    const cartBody = document.getElementById('cart-body');
    const countBadge = document.getElementById('cart-count');
    const totalDisplay = document.getElementById('cart-total');

    if (cart.length === 0) {
        cartBody.innerHTML = '<p class="empty-text">Your bag is currently empty.</p>';
        countBadge.style.display = 'none';
        totalDisplay.innerText = 'TSh 0';
        return;
    }

    countBadge.style.display = 'flex';
    countBadge.innerText = cart.reduce((total, item) => total + item.quantity, 0);

    let grandTotal = 0;
    cartBody.innerHTML = '';

    cart.forEach((item, idx) => {
        const rowCost = item.price * item.quantity;
        grandTotal += rowCost;

        cartBody.innerHTML += `
            <div class="cart-item">
                <div class="item-info">
                    <h4>${item.name}</h4>
                    <p>TSh ${item.price.toLocaleString()} × ${item.quantity}</p>
                </div>
                <div class="item-actions">
                    <strong>TSh ${rowCost.toLocaleString()}</strong>
                    <button onclick="removeCartItem(${idx})" class="remove-btn"><i class="far fa-trash-alt"></i></button>
                </div>
            </div>
        `;
    });

    totalDisplay.innerText = `TSh ${grandTotal.toLocaleString()}`;
}

function executeCheckout(event) {
    event.preventDefault();
    if (cart.length === 0) {
        alert("Please add at least one bag to your cart.");
        return;
    }

    const name = document.getElementById('cust-name').value;
    const email = document.getElementById('cust-email').value;
    const address = document.getElementById('cust-addr').value;

    alert(`Thank you, ${name}! Your order has been placed. A confirmation dispatch note will be sent to ${email} for shipment tracking to ${address}.`);
    
    cart = [];
    document.getElementById('checkout-form').reset();
    renderCart();
    closeAllOverlays();
}