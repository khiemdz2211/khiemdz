// Load cart items from localStorage
const loadCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cart-items');
    const totalContainer = document.getElementById('cart-total');

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Giỏ hàng của bạn đang trống.</p>';
        totalContainer.innerHTML = '';
        return;
    }

    let total = 0;
    cartContainer.innerHTML = cart.map(item => {
        const itemTotal = item.price * (1 - item.discount / 100) * item.quantity;
        total += itemTotal;
        return `
            <div class="cart-item">
                <img src="${item.thumb}" alt="${item.name}" class="cart-item-thumb">
                <div>
                    <h3>${item.name}</h3>
                    <p>Giá: ${(item.price * (1 - item.discount / 100)).toLocaleString()}₫</p>
                    <p>Số lượng: 
                        <input type="number" class="quantity-input" data-id="${item.id}" value="${item.quantity}" min="1">
                    </p>
                    <button class="remove-item btn btn-danger" data-id="${item.id}">Xóa</button>
                </div>
            </div>
        `;
    }).join('');

    totalContainer.innerHTML = `<h3>Tổng: ${total.toLocaleString()}₫</h3>`;

    // Add event listeners for quantity changes and item removal
    document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('change', (e) => {
            const id = e.target.dataset.id;
            const newQuantity = parseInt(e.target.value);
            updateQuantity(id, newQuantity);
        });
    });

    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = e.target.dataset.id;
            removeItem(id);
        });
    });
};

// Update item quantity in the cart
const updateQuantity = (id, quantity) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(item => item.id === id);

    if (item) {
        if (quantity > 0) {
            item.quantity = quantity;
        } else {
            cart.splice(cart.indexOf(item), 1);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        loadCart();
    }
};

// Remove item from the cart
const removeItem = (id) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    loadCart();
};

// Handle checkout process
const checkout = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        alert('Giỏ hàng của bạn đang trống.');
        return;
    }

    // Simulate checkout process
    alert('Thanh toán thành công!');
    localStorage.removeItem('cart');
    loadCart();
};

// Initialize cart on page load
document.addEventListener('DOMContentLoaded', loadCart);
