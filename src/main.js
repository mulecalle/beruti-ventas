let currentProduct = null;
let currentImageIndex = 0;

function openModal(product) {
    currentProduct = product;
    currentImageIndex = 0;
    
    const modal = document.getElementById('productModal');
    const mainImage = document.getElementById('modalMainImage');
    const title = document.getElementById('modalTitle');
    const description = document.getElementById('modalDescription');
    const price = document.getElementById('modalPrice');
    const thumbnailContainer = document.querySelector('.thumbnail-container');
    const navButtons = document.querySelectorAll('.nav-btn');
    const keyboardHint = document.querySelector('.keyboard-nav-hint');
    
    // Set main content
    title.textContent = product.name;
    description.textContent = product.description;
    price.textContent = `$${product.price.toFixed(2)}`;
    
    // Check if gallery exists and has images
    if (product.gallery && product.gallery.length > 0) {
        mainImage.src = product.gallery[0];
        
        // Show navigation elements
        thumbnailContainer.style.display = 'flex';
        navButtons.forEach(btn => btn.style.display = 'block');
        if (keyboardHint) keyboardHint.style.display = 'block';
        
        // Create thumbnails
        thumbnailContainer.innerHTML = product.gallery
            .map((img, index) => `
                <img src="${img}" 
                     class="thumbnail ${index === 0 ? 'active' : ''}" 
                     onclick="changeImage(${index})"
                     alt="Thumbnail ${index + 1}"
                >
            `).join('');
    } else {
        // Use single imageUrl and hide navigation elements
        mainImage.src = product.imageUrl;
        thumbnailContainer.style.display = 'none';
        navButtons.forEach(btn => btn.style.display = 'none');
        if (keyboardHint) keyboardHint.style.display = 'none';
    }
    
    modal.style.display = 'block';
}

function navigateImage(direction) {
    if (!currentProduct || !currentProduct.gallery || currentProduct.gallery.length <= 1) return;
    
    const newIndex = (currentImageIndex + direction + currentProduct.gallery.length) % currentProduct.gallery.length;
    changeImage(newIndex);
}

function changeImage(index) {
    if (!currentProduct || !currentProduct.gallery || !currentProduct.gallery[index]) return;
    
    currentImageIndex = index;
    const mainImage = document.getElementById('modalMainImage');
    mainImage.src = currentProduct.gallery[index];
    
    // Update active thumbnail
    document.querySelectorAll('.thumbnail').forEach((thumb, i) => {
        thumb.classList.toggle('active', i === index);
    });
}

function handleProductClick(productId) {
    const product = window.productsList.find(p => p.id === productId);
    if (product) {
        openModal(product);
    }
}

function closeModal() {
    document.getElementById('productModal').style.display = 'none';
}

// Initialize everything when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const galleryGrid = document.querySelector('.gallery-grid');
    galleryGrid.innerHTML = window.productsList.map(product => `
        <div class="gallery-item" onclick="handleProductClick(${product.id})">
            <img src="${product.imageUrl}" alt="${product.name}">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p class="price">$${product.price.toFixed(2)}</p>
            </div>
        </div>
    `).join('');
    
    // Set up modal close handlers
    const closeBtn = document.querySelector('.close');
    if (closeBtn) {
        closeBtn.onclick = closeModal;
        closeBtn.addEventListener('click', closeModal);
    }

    // Close with ESC key and handle keyboard navigation
    document.addEventListener('keydown', (event) => {
        const modal = document.getElementById('productModal');
        if (modal && modal.style.display === 'block') {
            switch(event.key) {
                case 'Escape':
                    modal.style.display = 'none';
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

    // Close by clicking outside
    window.addEventListener('click', (event) => {
        const modal = document.getElementById('productModal');
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Set up navigation buttons
    document.querySelector('.prev').onclick = () => navigateImage(-1);
    document.querySelector('.next').onclick = () => navigateImage(1);

    // Add transition style to the main image
    document.querySelector('.main-image img').style.transition = 'opacity 0.15s ease-in-out';
}); 