const routes = {
    '/': 'home',
    '/product/:id': 'product'
};

function router() {
    const path = window.location.hash.slice(1) || '/';
    const content = document.getElementById('app');
    
    if (path === '/') {
        import('./pages/home.js')
            .then(module => {
                content.innerHTML = module.default();
                initializeGallery();
            });
    } else if (path.startsWith('/product/')) {
        const id = path.split('/')[2];
        import('./pages/product.js')
            .then(module => {
                const product = window.productsList.find(p => p.id === parseInt(id));
                content.innerHTML = module.default(product);
            });
    }
} 