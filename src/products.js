const products = [
    {
        id: 1,
        name: "Rack TV",
        description: "Rack de pared para TV",
        extendedDescription: "Rack de pared para TV\nNo incluye soporte",
        reference: "https://www.example.com/rack-tv",
        price: 80000,
        imageUrl: "./images/rack/rack.jpg",
        category: "Art",
        gallery: [
            "./images/rack/rack.jpg",
            "./images/rack/rack_1.jpg",
            "./images/rack/rack_2.jpg"
        ],
        dimensions: {
            length: 130,
            width: 8.5,
            height: 130
        }
    },
    {
        id: 2,
        name: "Escritorio",
        description: "Escritorio a medida",
        extendedDescription: "Escritorio con estantes de guardado\nPuertas con cierra facil\nBuen espacio de guardado\nEstantes moviles",
        reference: "https://www.example.com/mueble-escritorio",
        price: 290000,
        imageUrl: "./images/mueble/mueble.jpg",
        category: "Art",
        gallery: [
            "./images/mueble/mueble.jpg",
            "./images/mueble/mueble_1.jpg",
            "./images/mueble/mueble_2.jpg",
            "./images/mueble/mueble_3.jpg",
            "./images/mueble/mueble_4.jpg",
            "./images/mueble/mueble_5.jpg",
            "./images/mueble/mueble_6.jpg",
            "./images/mueble/mueble_7.jpg"
        ],
        dimensions: {
            length: 106,
            width: 60,
            height: 240
        }
    },
    {
        id: 3,
        name: "Sillon",
        description: "Sillon dos cuerpos con puff",
        extendedDescription: "Medidas del puff 70x70x40\nCon uso, requiere limpieza ",
        reference: "https://www.example.com/sillon",
        price: 490000,
        imageUrl: "./images/sillon/sillon.jpg",
        category: "Art",
        gallery: [
            "./images/sillon/sillon.jpg",
            "./images/sillon/sillon_1.jpg",
            "./images/sillon/sillon_2.jpg",
            "./images/sillon/sillon_3.jpg",
            "./images/sillon/sillon_4.jpg",
            "./images/sillon/sillon_5.jpg",
            "./images/sillon/sillon_6.jpg",
            "./images/sillon/sillon_7.jpg"
        ],
        dimensions: {
            length: 210,
            width: 95,
            height: 72
        }
    },
    {
        id: 4,
        name: "Lampara de techo",
        description: "6 lamparas LED",
        extendedDescription: "6 lamparas LED",
        reference: "https://www.example.com/lampara-techo",
        price: 150000,
        imageUrl: "./images/lampara/lampara.jpg",
        category: "Art",
        gallery: [
            "./images/lampara/lampara.jpg",
            "./images/lampara/lampara_1.jpg",
            "./images/lampara/lampara_2.jpg",
            "./images/lampara/lampara_3.jpg",
            "./images/lampara/lampara_4.jpg"
        ]
    },
    {
        id: 5,
        name: "Lampara Colgante",
        description: "7 lamparas LED",
        extendedDescription: "7 lamparas LED\nCon opcion de distintas combinaciones de encendido",
        reference: "https://www.example.com/lampara-colgante",
        price: 180000,
        imageUrl: "./images/colgante/colgante.jpg",
        category: "Art",
        gallery: [
            "./images/colgante/colgante.jpg",
            "./images/colgante/colgante_1.jpg",
            "./images/colgante/colgante_2.jpg",
            "./images/colgante/colgante_3.jpg",
            "./images/colgante/colgante_4.jpg"
        ]
    }
];

window.productsList = products;