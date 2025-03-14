export default function HomePage() {
    return `
        <section class="title-section">
            <h1>Welcome to Beruti Ventas</h1>
        </section>
        <div class="main-content">
            <section class="description-section">
                <p>Todas las medidas estan en largo x profundidad x alto(cm)</p>
            </section>
            <section class="gallery-section">
                <div class="gallery-grid"></div>
            </section>
        </div>
    `;
}

function renderProducts(products) {
    const productsContainer = document.querySelector('#products-container');
    // ... existing code ...
    
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product-card');
        
        // ... existing product card HTML ...
        
        // Add sizes information to the product card
        const sizesHtml = product.sizes 
            ? `<p class="product-sizes">Available sizes: ${product.sizes.join(', ')}</p>` 
            : '';
        
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-price">$${product.price.toFixed(2)}</p>
            ${sizesHtml}
            <button class="view-details" data-id="${product.id}">View Details</button>
        `;
        
        // ... existing event listeners and code ...
        
        productsContainer.appendChild(productElement);
    });
} 