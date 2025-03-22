export default function ProductPage(product) {
    if (!product) return '<h1>Product not found</h1>';
    
    // Format price with thousand separators
    const formattedPrice = product.price ? 
        `$${product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}` : 
        'Precio a consultar';
    
    // Format dimensions if available
    const dimensionsHtml = product.dimensions 
        ? `<div class="product-dimensions">
             <h3>Medidas:</h3>
             <p>Largo: ${product.dimensions.length} cm</p>
             <p>Profundidad: ${product.dimensions.width} cm</p>
             <p>Alto: ${product.dimensions.height} cm</p>
           </div>`
        : '';
    
    // Format extended description with bullets
    const formattedExtendedDescription = product.extendedDescription 
        ? product.extendedDescription
            .split('\n')
            .map(line => line.trim() ? `• ${line}` : line)
            .join('\n')
        : '';
    
    // Create reference section if available (optional)
    const referenceHtml = product.reference && product.reference.trim() !== ''
        ? `<div class="product-reference">
             <h3>Referencia:</h3>
             <a href="${product.reference}" target="_blank" rel="noopener noreferrer">
               <span class="reference-icon">&#128279;</span> Ver publicacion
             </a>
           </div>`
        : '';
    
    return `
        <div class="product-detail">
            <div class="modal-gallery">
                <div class="main-image">
                    <img id="modalMainImage" src="${product.imageUrl}" alt="${product.name}">
                    ${product.gallery && product.gallery.length > 0 ? `
                        <button class="nav-btn prev">&#10094;</button>
                        <button class="nav-btn next">&#10095;</button>
                    ` : ''}
                </div>
                ${product.gallery && product.gallery.length > 0 ? `
                    <div class="thumbnail-container">
                        ${product.gallery.map((img, i) => `
                            <img src="${img}" class="thumbnail ${i === 0 ? 'active' : ''}" 
                                 onclick="changeImage(${i})" alt="Thumbnail ${i + 1}">
                        `).join('')}
                    </div>
                ` : ''}
            </div>
            <div class="product-info">
                <h2>${product.name}</h2>
                <p class="product-price">${formattedPrice}</p>
                <p class="product-description">${product.description}</p>
                ${formattedExtendedDescription ? 
                    `<p class="product-extended-description">${formattedExtendedDescription}</p>` 
                    : ''}
                ${referenceHtml}
                ${dimensionsHtml}
                <button onclick="window.history.back()">Back to Gallery</button>
            </div>
        </div>
    `;
}

function renderProductDetails(product) {
    const productDetailContainer = document.querySelector('#product-detail-container');
    
    // Create size selection options
    const sizeOptions = product.sizes 
        ? product.sizes.map(size => `<option value="${size}">${size}</option>`).join('') 
        : '<option value="">No sizes available</option>';
    
    productDetailContainer.innerHTML = `
        <div class="product-detail">
            <img src="${product.image}" alt="${product.name}" class="product-detail-image">
            <div class="product-info">
                <h2 class="product-detail-name">${product.name}</h2>
                <p class="product-detail-price">$${product.price.toFixed(2)}</p>
                <p class="product-detail-description">${product.description}</p>
                
                <div class="product-size-selection">
                    <label for="size-select">Select Size:</label>
                    <select id="size-select" name="size">
                        ${sizeOptions}
                    </select>
                </div>
                
                <button id="add-to-cart" class="add-to-cart-btn">Add to Cart</button>
            </div>
        </div>
    `;
    
    // Add event listener for the Add to Cart button
    document.getElementById('add-to-cart').addEventListener('click', () => {
        const selectedSize = document.getElementById('size-select').value;
        // Add to cart logic with the selected size
        console.log(`Added ${product.name} with size ${selectedSize} to cart`);
        // Implement your cart functionality here
    });
} 