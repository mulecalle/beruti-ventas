import express from 'express';
import path from 'path';
import { products } from './data/products';

const app = express();
const port = 8080;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '../public')));

// Set up view engine (optional for now)
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'html');

// API endpoint for products
app.get('/api/products', (req, res) => {
    res.json(products);
});

// Basic route for the home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
