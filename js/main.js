// Fetch data from data.json and dynamically load items
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const body = document.getElementById('body'); // Target the container for products

        data.forEach(item => {
            // Create a product card
            const productCard = document.createElement('div');
            productCard.className = 'col-4 mb-4';
            productCard.dataset.id = item.id; // Store item ID for later use

            productCard.innerHTML = `
                <div class="product">
                    <div class="discount-tag">-${item.discount}%</div>
                    <img src="${item.thumb}" alt="${item.name}">
                    <div class="product-name">${item.name}</div>
                    <div class="price">${(item.price * (1 - item.discount / 100)).toLocaleString()}₫</div>
                    <div class="old-price">${parseInt(item.price).toLocaleString()}₫</div>
                </div>
            `;

            // Add click event to load details
            productCard.addEventListener('click', () => {
                fetch(`data.json`) // Replace with API endpoint if available
                    .then(response => response.json())
                    .then(details => {
                        const itemDetails = details.find(detail => detail.id === item.id);
                        if (itemDetails) {
                            const detailModal = document.getElementById('detailModal');
                            detailModal.querySelector('.modal-title').textContent = itemDetails.name;
                            detailModal.querySelector('.modal-body').innerHTML = `
                                <img src="${itemDetails.thumb}" alt="${itemDetails.name}" class="img-fluid">
                                <p>${itemDetails.description}</p>
                                <p><strong>Price:</strong> ${(itemDetails.price * (1 - itemDetails.discount / 100)).toLocaleString()}₫</p>
                                <p><strong>Old Price:</strong> ${parseInt(itemDetails.price).toLocaleString()}₫</p>
                            `;
                            const modal = new bootstrap.Modal(detailModal);
                            modal.show();
                        }
                    })
                    .catch(error => console.error('Error loading details:', error));
            });

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