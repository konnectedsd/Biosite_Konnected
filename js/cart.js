const CART_KEY = 'konnected_cart';

// Format price utility
function formatPrice(value) {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function getCart() {
    const cartData = localStorage.getItem(CART_KEY);
    return cartData ? JSON.parse(cartData) : {};
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartUI();
}

function addToCart(id, name, price) {
    const cart = getCart();
    if (cart[id]) {
        cart[id].quantity += 1;
    } else {
        cart[id] = { id, name, price, quantity: 1 };
    }
    saveCart(cart);
}

function removeFromCart(id) {
    const cart = getCart();
    if (cart[id]) {
        cart[id].quantity -= 1;
        if (cart[id].quantity <= 0) {
            delete cart[id];
        }
        saveCart(cart);
    }
}

function updateCartUI() {
    const cart = getCart();
    
    // Update Floating Cart Button visibility and counter
    const floatingCart = document.getElementById('floating-cart');
    const cartCounter = document.getElementById('cart-counter');
    
    let totalItems = 0;
    for (const key in cart) {
        totalItems += cart[key].quantity;
    }
    
    if (floatingCart) {
        if (totalItems > 0) {
            floatingCart.classList.remove('hidden');
            floatingCart.classList.add('flex');
            if(cartCounter) cartCounter.innerText = totalItems;
        } else {
            floatingCart.classList.add('hidden');
            floatingCart.classList.remove('flex');
        }
    }
    
    // Update individual product counters in tabela-de-precos
    document.querySelectorAll('.product-counter').forEach(el => {
        const id = el.getAttribute('data-id');
        if (cart[id]) {
            el.innerText = cart[id].quantity;
        } else {
            el.innerText = "0";
        }
    });
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    updateCartUI();
});
