// Get the product ID from the query parameter
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

// Fetch product details from data.json
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const product = data.find(item => item.id === productId);
        if (product) {
            const detailsContainer = document.getElementById('product-details');
            detailsContainer.innerHTML = `
                <div class="col-6">
                    <img src="${product.thumb}" alt="${product.name}" class="img-fluid product-image">
                </div>
                <div class="col-6">
                    <h1>${product.name}</h1>
                    <p>Giá: ${(product.price * (1 - product.discount / 100)).toLocaleString()}₫</p>
                    <div>
                        <input type="number" id="quantity" value="1" min="1">
                        <button id="add-to-cart" class="btn btn-primary">Thêm vào giỏ</button>
                        <button id="buy-now" class="btn btn-success">Mua ngay</button>
                    </div>
                </div>
            `;

            // Add event listeners after elements are added to the DOM
            const addToCartButton = document.getElementById('add-to-cart');
            const buyNowButton = document.getElementById('buy-now');
            const quantityInput = document.getElementById('quantity');

            const updateCart = (product, quantity) => {
                const cart = JSON.parse(localStorage.getItem('cart')) || [];
                const existingProduct = cart.find(item => item.id === product.id);

                if (existingProduct) {
                    existingProduct.quantity += quantity;
                } else {
                    cart.push({ ...product, quantity });
                }

                localStorage.setItem('cart', JSON.stringify(cart));
            };

            addToCartButton.addEventListener('click', () => {
                const quantity = parseInt(quantityInput.value);
                if (quantity > 0) {
                    updateCart(product, quantity);
                    alert(`Đã thêm ${quantity} sản phẩm vào giỏ hàng.`);
                } else {
                    alert('Vui lòng chọn số lượng hợp lệ.');
                }
            });

            // Ensure event listener for "Buy Now" button is added
            buyNowButton.addEventListener('click', () => {
                const quantity = parseInt(quantityInput.value);
                if (quantity > 0) {
                    updateCart(product, quantity);
                    window.location.href = 'cart.html'; // Redirect to cart page
                } else {
                    alert('Vui lòng chọn số lượng hợp lệ.');
                }
            });
        } else {
            document.getElementById('product-details').innerHTML = '<p>Product not found.</p>';
        }
    })
    .catch(error => console.error('Error loading product details:', error));
