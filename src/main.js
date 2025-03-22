let currentProduct = null;
let currentImageIndex = 0;

function handleProductClick(productId) {
    const product = window.productsList.find(p => p.id === productId);
    if (product) {
        // Update URL without reloading the page
        const newUrl = `${window.location.pathname}?product=${productId}`;
        window.history.pushState({ productId }, '', newUrl);
        openModal(product);
    }
}

function openModal(product) {
    currentProduct = product;
    currentImageIndex = 0;
    
    const modal = document.getElementById('productModal');
    const mainImage = document.getElementById('modalMainImage');
    const title = document.getElementById('modalTitle');
    const description = document.getElementById('modalDescription');
    const modalContent = document.querySelector('.modal-content');
    const thumbnailContainer = document.querySelector('.thumbnail-container');
    const navButtons = document.querySelectorAll('.nav-btn');
    const keyboardHint = document.querySelector('.keyboard-nav-hint');
    const productInfo = document.querySelector('.modal-product-info');
    
    // Set main content
    title.textContent = product.name;
    
    // Format extended description with bullets
    const formattedDescription = product.extendedDescription 
        ? product.extendedDescription
            .split('\n')
            .map(line => line.trim() ? `• ${line}` : line)
            .join('\n')
        : product.description;
    
    description.textContent = formattedDescription;
    
    // Format price with thousand separators
    const formattedPrice = product.price ? 
        `$${product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}` : 
        'Precio a consultar';
    
    // Add price after title
    const priceHtml = `<p class="product-price">${formattedPrice}</p>`;
    
    // Remove any existing price element
    const existingPrice = modalContent.querySelector('.product-price');
    if (existingPrice) {
        existingPrice.remove();
    }
    
    // Insert price after title
    title.insertAdjacentHTML('afterend', priceHtml);
    
    // Add dimensions after description
    if (product.dimensions) {
        const dimensionsHtml = `
            <div class="product-dimensions">
                <h3>Medidas:</h3>
                <p>Largo: ${product.dimensions.length} cm</p>
                <p>Profundidad: ${product.dimensions.width} cm</p>
                <p>Alto: ${product.dimensions.height} cm</p>
            </div>
        `;
        
        // Remove any existing dimensions div
        const existingDimensions = modalContent.querySelector('.product-dimensions');
        if (existingDimensions) {
            existingDimensions.remove();
        }
        
        // Insert dimensions after description
        description.insertAdjacentHTML('afterend', dimensionsHtml);
    }
    
    // Add reference link if available (optional)
    if (product.reference && product.reference.trim() !== '') {
        const referenceHtml = `
            <div class="product-reference">
                <h3>Referencia:</h3>
                <a href="${product.reference}" target="_blank" rel="noopener noreferrer">
                    <span class="reference-icon">&#128279;</span> Ver publicacion
                </a>
            </div>
        `;
        
        // Remove any existing reference div
        const existingReference = modalContent.querySelector('.product-reference');
        if (existingReference) {
            existingReference.remove();
        }
        
        // Insert reference before dimensions or after description if no dimensions
        const dimensionsDiv = modalContent.querySelector('.product-dimensions');
        if (dimensionsDiv) {
            dimensionsDiv.insertAdjacentHTML('beforebegin', referenceHtml);
        } else {
            description.insertAdjacentHTML('afterend', referenceHtml);
        }
    }
    
    // Check if gallery exists and has images
    if (product.gallery && product.gallery.length > 0) {
        mainImage.src = product.gallery[0];
        
        // Show navigation elements
        thumbnailContainer.style.display = 'flex';
        navButtons.forEach(btn => btn.style.display = 'block');
        if (keyboardHint) keyboardHint.style.display = 'block';
        
        // Create thumbnails
        const galleryHtml = product.gallery.map((img, i) => `
            <img src="${img}" class="thumbnail ${i === 0 ? 'active' : ''}" 
                 onclick="changeImage(${i})" alt="Thumbnail ${i + 1}">
        `).join('');
        thumbnailContainer.innerHTML = galleryHtml;
    } else {
        // Use single imageUrl and hide navigation elements
        mainImage.src = product.imageUrl;
        thumbnailContainer.style.display = 'none';
        navButtons.forEach(btn => btn.style.display = 'none');
        if (keyboardHint) keyboardHint.style.display = 'none';
    }
    
    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('productModal');
    if (modal) {
        modal.style.display = 'none';
        // Update URL without the product parameter
        window.history.pushState({}, '', window.location.pathname);
        currentProduct = null;
        currentImageIndex = 0;
    }
}

function changeImage(index) {
    if (!currentProduct || !currentProduct.gallery) return;
    
    currentImageIndex = index;
    const mainImage = document.getElementById('modalMainImage');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    mainImage.src = currentProduct.gallery[index];
    thumbnails.forEach((thumb, i) => {
        thumb.classList.toggle('active', i === index);
    });
}

function navigateImage(direction) {
    if (!currentProduct || !currentProduct.gallery || currentProduct.gallery.length <= 1) return;
    
    const newIndex = (currentImageIndex + direction + currentProduct.gallery.length) % currentProduct.gallery.length;
    changeImage(newIndex);
}

// Initialize everything when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check for product ID in URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('product');
    
    if (productId) {
        const product = window.productsList.find(p => p.id === parseInt(productId));
        if (product) {
            openModal(product);
        }
    }

    const galleryGrid = document.querySelector('.gallery-grid');
    galleryGrid.innerHTML = window.productsList.map(product => {
        return `
            <div class="gallery-item" onclick="handleProductClick(${product.id})">
                <img src="${product.imageUrl}" alt="${product.name}">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                </div>
            </div>
        `;
    }).join('');

    // Set up modal close handlers
    const closeButton = document.querySelector('.close');
    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }

    // Close modal when clicking outside
    const modal = document.getElementById('productModal');
    if (modal) {
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                closeModal();
            }
        });
    }

    // Handle keyboard events
    document.addEventListener('keydown', (event) => {
        const modal = document.getElementById('productModal');
        if (modal && modal.style.display === 'block') {
            switch(event.key) {
                case 'Escape':
                    closeModal();
                    break;
                case 'ArrowLeft':
                    navigateImage(-1);
                    break;
                case 'ArrowRight':
                    navigateImage(1);
                    break;
            }
        }
    });

    // Add click handlers for navigation buttons
    const prevButton = document.querySelector('.nav-btn.prev');
    const nextButton = document.querySelector('.nav-btn.next');
    
    if (prevButton) {
        prevButton.addEventListener('click', () => navigateImage(-1));
    }
    if (nextButton) {
        nextButton.addEventListener('click', () => navigateImage(1));
    }
});

// Handle browser back/forward buttons
window.addEventListener('popstate', (event) => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('product');
    
    if (productId) {
        const product = window.productsList.find(p => p.id === parseInt(productId));
        if (product) {
            openModal(product);
        }
    } else {
        closeModal();
    }
}); 