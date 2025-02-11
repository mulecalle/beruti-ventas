"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const products_1 = require("./data/products");
const app = (0, express_1.default)();
const port = 8080;
// Serve static files from the 'public' directory
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
// Set up view engine (optional for now)
app.set('views', path_1.default.join(__dirname, '../views'));
app.set('view engine', 'html');
// API endpoint for products
app.get('/api/products', (req, res) => {
    res.json(products_1.products);
});
// Basic route for the home page
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../public/index.html'));
});
// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
