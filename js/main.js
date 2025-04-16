// Fetch data from data.json and dynamically load items
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const body = document.getElementById('body'); // Target the container for products

        data.forEach(item => {
            // Create a product card
            const productCard = document.createElement('div');
            productCard.className = 'col-4 mb-4';

            productCard.innerHTML = `
                <a href="details.html?id=${item.id}" class="product">
                    <div class="discount-tag">-${item.discount}%</div>
                    <img src="${item.thumb}" alt="${item.name}">
                    <div class="product-name">${item.name}</div>
                    <div class="price">${(item.price * (1 - item.discount / 100)).toLocaleString()}₫</div>
                    <div class="old-price">${parseInt(item.price).toLocaleString()}₫</div>
                </a>
            `;

            // Append the product card to the container
            body.appendChild(productCard);
        });
    })
    .catch(error => console.error('Error loading data:', error));

// Search functionality
document.getElementById('searchInput').addEventListener('input', (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const searchContainer = document.getElementById('search-item');
    searchContainer.innerHTML = ''; // Clear previous results

    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const filteredItems = data.filter(item => item.name.toLowerCase().includes(searchTerm));

            filteredItems.forEach(item => {
                const productMini = document.createElement('div');
                productMini.className = 'product-mini';

                productMini.innerHTML = `
                    <img src="${item.thumb}" alt="${item.name}">
                    <div>
                        <p>${item.name}</p>
                        <p class="price">${(item.price * (1 - item.discount / 100)).toLocaleString()}₫</p>
                    </div>
                `;

                searchContainer.appendChild(productMini);
            });
        })
        .catch(error => console.error('Error loading search results:', error));
});