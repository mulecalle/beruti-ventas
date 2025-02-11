export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    category: string;
    gallery: string[];
}

export const products: Product[] = [
    {
        id: 1,
        name: "Modern Office Chair",
        description: "Ergonomic design with lumbar support",
        price: 199.99,
        imageUrl: "/images/products/chair-1/thumbnail.jpg",
        category: "Furniture",
        gallery: [
            "/images/products/chair-1/1.jpg",
            "/images/products/chair-1/2.jpg",
            "/images/products/chair-1/3.jpg"
        ]
    },
    {
        id: 2,
        name: "Vintage Table Lamp",
        description: "Classic design with brass finish",
        price: 89.99,
        imageUrl: "/images/products/lamp-1/thumbnail.jpg",
        category: "Lighting",
        gallery: []
    },
    {
        id: 3,
        name: "Ceramic Vase Set",
        description: "Set of 3 handcrafted vases",
        price: 149.99,
        imageUrl: "/images/products/vase-set-1/thumbnail.jpg",
        category: "Decor",
        gallery: []
    },
    {
        id: 4,
        name: "Leather Sofa",
        description: "Premium Italian leather, 3-seater",
        price: 999.99,
        imageUrl: "/images/products/sofa-1/thumbnail.jpg",
        category: "Furniture",
        gallery: []
    },
    {
        id: 5,
        name: "Wall Art Canvas",
        description: "Abstract design, 40x60 inches",
        price: 299.99,
        imageUrl: "/images/products/canvas-1/thumbnail.jpg",
        category: "Art",
        gallery: []
    },
    {
        id: 6,
        name: "Smart Coffee Maker",
        description: "WiFi-enabled, 12-cup capacity",
        price: 179.99,
        imageUrl: "/images/products/coffee-maker-1/thumbnail.jpg",
        category: "Appliances",
        gallery: []
    }
]; 