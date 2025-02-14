export default function ProductPage(product) {
    if (!product) return '<h1>Product not found</h1>';
    
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
                <p>${product.description}</p>
                <p class="price">$${product.price.toFixed(2)}</p>
                <button onclick="window.history.back()">Back to Gallery</button>
            </div>
        </div>
    `;
} 