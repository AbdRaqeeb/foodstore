const products = [
    {
        _id: "5fe5a36a8c1ca1209c48f7db",
        user: "5fe5a36a8c1ca1209c48f7bd",
        category: "5fe5a36a8c1ca1209c48f7d1",
        name: "Large Eggs",
        brand: "Happy Brown",
        unit: '12 pcs',
        images: [
            "https://res.cloudinary.com/abdraqeeb/image/upload/v1608847989/FoodStore%20Products/sssp3xe5xvkf4h0gwpq2.jpg",
            "https://res.cloudinary.com/abdraqeeb/image/upload/v1608847992/FoodStore%20Products/lqfbfk0otrikeivzdugi.jpg",
            "https://res.cloudinary.com/abdraqeeb/image/upload/v1608847996/FoodStore%20Products/huwvuquyifasoggs61zz.jpg"
        ],
        description: "Lorem ipsum",
        price: 1200,
        cost: 1300,
        countInStock: 10
    },
    {
        _id: "5fe5a36a8c1ca1209c48f7dc",
        user: "5fe5a36a8c1ca1209c48f7bd",
        category: "5fe5a36a8c1ca1209c48f7d1",
        name: "Milk",
        brand: "Peak",
        unit: '12 pcs',
        images: [
            "https://res.cloudinary.com/abdraqeeb/image/upload/v1608847989/FoodStore%20Products/sssp3xe5xvkf4h0gwpq2.jpg",
            "https://res.cloudinary.com/abdraqeeb/image/upload/v1608847992/FoodStore%20Products/lqfbfk0otrikeivzdugi.jpg",
            "https://res.cloudinary.com/abdraqeeb/image/upload/v1608847996/FoodStore%20Products/huwvuquyifasoggs61zz.jpg"
        ],
        description: "Lorem ipsum",
        price: 500,
        cost: 550,
        countInStock: 20
    },
    {
        _id: "5fe5a36a8c1ca1209c48f7dd",
        user: "5fe5a36a8c1ca1209c48f7bd",
        category: "5fe5a36a8c1ca1209c48f7d2",
        name: "Beef Flap",
        brand: "Carne Asada",
        unit: "1 pack",
        images: [
            "https://res.cloudinary.com/abdraqeeb/image/upload/v1608847989/FoodStore%20Products/sssp3xe5xvkf4h0gwpq2.jpg",
            "https://res.cloudinary.com/abdraqeeb/image/upload/v1608847992/FoodStore%20Products/lqfbfk0otrikeivzdugi.jpg",
            "https://res.cloudinary.com/abdraqeeb/image/upload/v1608847996/FoodStore%20Products/huwvuquyifasoggs61zz.jpg"
        ],
        description: "Lorem ipsum",
        price: 350,
        cost: 400,
        countInStock: 20
    },
    {
        _id: "5fe5a36a8c1ca1209c48f7de",
        user: "5fe5a36a8c1ca1209c48f7bd",
        category: "5fe5a36a8c1ca1209c48f7d2",
        name: "Chicken Sausages",
        brand: "Beyond Meat",
        unit: "1 pack",
        images: [
            "https://res.cloudinary.com/abdraqeeb/image/upload/v1608847989/FoodStore%20Products/sssp3xe5xvkf4h0gwpq2.jpg",
            "https://res.cloudinary.com/abdraqeeb/image/upload/v1608847992/FoodStore%20Products/lqfbfk0otrikeivzdugi.jpg",
            "https://res.cloudinary.com/abdraqeeb/image/upload/v1608847996/FoodStore%20Products/huwvuquyifasoggs61zz.jpg"
        ],
        description: "Lorem ipsum",
        price: 500,
        cost: 800,
        countInStock: 10
    },
    {
        _id: "5fe5a36a8c1ca1209c48f7df",
        user: "5fe5a36a8c1ca1209c48f7bd",
        category: "5fe5a36a8c1ca1209c48f7d3",
        name: "Panla",
        brand: "Sea Food",
        unit: "1 kg",
        images: [
            "https://res.cloudinary.com/abdraqeeb/image/upload/v1608847989/FoodStore%20Products/sssp3xe5xvkf4h0gwpq2.jpg",
            "https://res.cloudinary.com/abdraqeeb/image/upload/v1608847992/FoodStore%20Products/lqfbfk0otrikeivzdugi.jpg",
            "https://res.cloudinary.com/abdraqeeb/image/upload/v1608847996/FoodStore%20Products/huwvuquyifasoggs61zz.jpg"
        ],
        description: "Lorem ipsum",
        price: 900,
        cost: 1000,
        countInStock: 10
    },
    {
        _id: "5fe5a36a8c1ca1209c48f7e0",
        user: "5fe5a36a8c1ca1209c48f7bd",
        category: "5fe5a36a8c1ca1209c48f7d3",
        name: "Titus",
        brand: "Sea Foods",
        unit: "1 kg",
        images: [
            "https://res.cloudinary.com/abdraqeeb/image/upload/v1608847989/FoodStore%20Products/sssp3xe5xvkf4h0gwpq2.jpg",
            "https://res.cloudinary.com/abdraqeeb/image/upload/v1608847992/FoodStore%20Products/lqfbfk0otrikeivzdugi.jpg",
            "https://res.cloudinary.com/abdraqeeb/image/upload/v1608847996/FoodStore%20Products/huwvuquyifasoggs61zz.jpg"
        ],
        description: "Lorem ipsum",
        price: 800,
        cost: 850,
        countInStock: 10
    },
    {
        _id: "5fe5a36a8c1ca1209c48f7e1",
        user: "5fe5a36a8c1ca1209c48f7bd",
        category: "5fe5a36a8c1ca1209c48f7d4",
        name: "Sweet Rice",
        brand: "Basmati",
        unit: "1 bag",
        images: [
            "https://res.cloudinary.com/abdraqeeb/image/upload/v1608847989/FoodStore%20Products/sssp3xe5xvkf4h0gwpq2.jpg",
            "https://res.cloudinary.com/abdraqeeb/image/upload/v1608847992/FoodStore%20Products/lqfbfk0otrikeivzdugi.jpg",
            "https://res.cloudinary.com/abdraqeeb/image/upload/v1608847996/FoodStore%20Products/huwvuquyifasoggs61zz.jpg"
        ],
        description: "Lorem ipsum",
        price: 20000,
        cost: 22000,
        countInStock: 50
    },
    {
        _id: "5fe5a36a8c1ca1209c48f7e2",
        user: "5fe5a36a8c1ca1209c48f7bd",
        category: "5fe5a36a8c1ca1209c48f7d4",
        name: "Long Rice",
        brand: "Unicorn",
        unit: "1 bag",
        images: [
            "https://res.cloudinary.com/abdraqeeb/image/upload/v1608847989/FoodStore%20Products/sssp3xe5xvkf4h0gwpq2.jpg",
            "https://res.cloudinary.com/abdraqeeb/image/upload/v1608847992/FoodStore%20Products/lqfbfk0otrikeivzdugi.jpg",
            "https://res.cloudinary.com/abdraqeeb/image/upload/v1608847996/FoodStore%20Products/huwvuquyifasoggs61zz.jpg"
        ],
        description: "Lorem ipsum",
        price: 23000,
        cost: 25000,
        countInStock: 20
    },
    {
        _id: "5fe5a36a8c1ca1209c48f7e3",
        user: "5fe5a36a8c1ca1209c48f7bd",
        category: "5fe5a36a8c1ca1209c48f7d5",
        name: "Peaches",
        brand: "Safeway",
        unit: "5 x 20g",
        images: [
            "https://res.cloudinary.com/abdraqeeb/image/upload/v1608847989/FoodStore%20Products/sssp3xe5xvkf4h0gwpq2.jpg",
            "https://res.cloudinary.com/abdraqeeb/image/upload/v1608847992/FoodStore%20Products/lqfbfk0otrikeivzdugi.jpg",
            "https://res.cloudinary.com/abdraqeeb/image/upload/v1608847996/FoodStore%20Products/huwvuquyifasoggs61zz.jpg"
        ],
        description: "Lorem ipsum",
        price: 1500,
        cost: 1800,
        countInStock: 40
    },
    {
        _id: "5fe5a36a8c1ca1209c48f7e4",
        user: "5fe5a36a8c1ca1209c48f7bd",
        category: "5fe5a36a8c1ca1209c48f7d5",
        name: "Dates",
        brand: "Halal Foods",
        unit: "1 pack",
        images: [
            "https://res.cloudinary.com/abdraqeeb/image/upload/v1608847989/FoodStore%20Products/sssp3xe5xvkf4h0gwpq2.jpg",
            "https://res.cloudinary.com/abdraqeeb/image/upload/v1608847992/FoodStore%20Products/lqfbfk0otrikeivzdugi.jpg",
            "https://res.cloudinary.com/abdraqeeb/image/upload/v1608847996/FoodStore%20Products/huwvuquyifasoggs61zz.jpg"
        ],
        description: "Lorem ipsum",
        price: 900,
        cost: 1050,
        countInStock: 20
    },
    {
        _id: "5fe5a36a8c1ca1209c48f7e5",
        user: "5fe5a36a8c1ca1209c48f7bd",
        category: "5fe5a36a8c1ca1209c48f7d6",
        name: "Cabbage",
        brand: "Halal Foods",
        unit: "2 pcs",
        images: [
            "https://res.cloudinary.com/abdraqeeb/image/upload/v1608847989/FoodStore%20Products/sssp3xe5xvkf4h0gwpq2.jpg",
            "https://res.cloudinary.com/abdraqeeb/image/upload/v1608847992/FoodStore%20Products/lqfbfk0otrikeivzdugi.jpg",
            "https://res.cloudinary.com/abdraqeeb/image/upload/v1608847996/FoodStore%20Products/huwvuquyifasoggs61zz.jpg"
        ],
        description: "Lorem ipsum",
        price: 300,
        cost: 320,
        countInStock: 60
    },
    {
        _id: "5fe5a36a8c1ca1209c48f7e6",
        user: "5fe5a36a8c1ca1209c48f7bd",
        category: "5fe5a36a8c1ca1209c48f7d6",
        name: "Carrot",
        brand: "Zai Farms",
        unit: "10 pcs",
        images: [
            "https://res.cloudinary.com/abdraqeeb/image/upload/v1608847989/FoodStore%20Products/sssp3xe5xvkf4h0gwpq2.jpg",
            "https://res.cloudinary.com/abdraqeeb/image/upload/v1608847992/FoodStore%20Products/lqfbfk0otrikeivzdugi.jpg",
            "https://res.cloudinary.com/abdraqeeb/image/upload/v1608847996/FoodStore%20Products/huwvuquyifasoggs61zz.jpg"
        ],
        description: "Lorem ipsum",
        price: 80,
        cost: 100,
        countInStock: 500
    },
    {
        _id: "5fe5a36a8c1ca1209c48f7e7",
        user: "5fe5a36a8c1ca1209c48f7bd",
        category: "5fe5a36a8c1ca1209c48f7d7",
        name: "Honey",
        brand: "Conille",
        unit: "250 ml",
        images: [
            "https://res.cloudinary.com/abdraqeeb/image/upload/v1608847989/FoodStore%20Products/sssp3xe5xvkf4h0gwpq2.jpg",
            "https://res.cloudinary.com/abdraqeeb/image/upload/v1608847992/FoodStore%20Products/lqfbfk0otrikeivzdugi.jpg",
            "https://res.cloudinary.com/abdraqeeb/image/upload/v1608847996/FoodStore%20Products/huwvuquyifasoggs61zz.jpg"
        ],
        description: "Lorem ipsum",
        price: 1950,
        cost: 2000,
        countInStock: 15
    },
    {
        _id: "5fe5a36a8c1ca1209c48f7e8",
        user: "5fe5a36a8c1ca1209c48f7bd",
        category: "5fe5a36a8c1ca1209c48f7d7",
        name: "Groundnut Oil",
        brand: "Kings",
        unit: "1 ltr",
        images: [
            "https://res.cloudinary.com/abdraqeeb/image/upload/v1608847989/FoodStore%20Products/sssp3xe5xvkf4h0gwpq2.jpg",
            "https://res.cloudinary.com/abdraqeeb/image/upload/v1608847992/FoodStore%20Products/lqfbfk0otrikeivzdugi.jpg",
            "https://res.cloudinary.com/abdraqeeb/image/upload/v1608847996/FoodStore%20Products/huwvuquyifasoggs61zz.jpg"
        ],
        description: "Lorem ipsum",
        price: 2500,
        cost: 2600,
        countInStock: 24
    },
    {
        _id: "5fe5a36a8c1ca1209c48f7e9",
        user: "5fe5a36a8c1ca1209c48f7bd",
        category: "5fe5a36a8c1ca1209c48f7d8",
        name: "5 Alive",
        brand: "Chi Foods",
        unit: "1 ltr",
        images: [
            "https://res.cloudinary.com/abdraqeeb/image/upload/v1608847989/FoodStore%20Products/sssp3xe5xvkf4h0gwpq2.jpg",
            "https://res.cloudinary.com/abdraqeeb/image/upload/v1608847992/FoodStore%20Products/lqfbfk0otrikeivzdugi.jpg",
            "https://res.cloudinary.com/abdraqeeb/image/upload/v1608847996/FoodStore%20Products/huwvuquyifasoggs61zz.jpg"
        ],
        description: "Lorem ipsum",
        price: 550,
        cost: 600,
        countInStock: 12
    },
    {
        _id: "5fe5a36a8c1ca1209c48f7ea",
        user: "5fe5a36a8c1ca1209c48f7bd",
        category: "5fe5a36a8c1ca1209c48f7d8",
        name: "Exotic Juice",
        brand: "Chi Foods",
        unit: "1 ltr",
        images: [
            "https://res.cloudinary.com/abdraqeeb/image/upload/v1608847989/FoodStore%20Products/sssp3xe5xvkf4h0gwpq2.jpg",
            "https://res.cloudinary.com/abdraqeeb/image/upload/v1608847992/FoodStore%20Products/lqfbfk0otrikeivzdugi.jpg",
            "https://res.cloudinary.com/abdraqeeb/image/upload/v1608847996/FoodStore%20Products/huwvuquyifasoggs61zz.jpg"
        ],
        description: "Lorem ipsum",
        price: 380,
        cost: 400,
        countInStock: 12
    },
    {
        _id: "5fe5a36a8c1ca1209c48f7eb",
        user: "5fe5a36a8c1ca1209c48f7bd",
        category: "5fe5a36a8c1ca1209c48f7d9",
        name: "Sardine",
        brand: "Titus",
        unit: "1 pc",
        images: [
            "https://res.cloudinary.com/abdraqeeb/image/upload/v1608847989/FoodStore%20Products/sssp3xe5xvkf4h0gwpq2.jpg",
            "https://res.cloudinary.com/abdraqeeb/image/upload/v1608847992/FoodStore%20Products/lqfbfk0otrikeivzdugi.jpg",
            "https://res.cloudinary.com/abdraqeeb/image/upload/v1608847996/FoodStore%20Products/huwvuquyifasoggs61zz.jpg"
        ],
        description: "Lorem ipsum",
        price: 270,
        cost: 300,
        countInStock: 25
    },
    {
        _id: "5fe5a36a8c1ca1209c48f7ec",
        user: "5fe5a36a8c1ca1209c48f7bd",
        category: "5fe5a36a8c1ca1209c48f7d9",
        name: "Fish & Tomatoes",
        brand: "Geisha",
        unit: "1 pc",
        images: [
            "https://res.cloudinary.com/abdraqeeb/image/upload/v1608847989/FoodStore%20Products/sssp3xe5xvkf4h0gwpq2.jpg",
            "https://res.cloudinary.com/abdraqeeb/image/upload/v1608847992/FoodStore%20Products/lqfbfk0otrikeivzdugi.jpg",
            "https://res.cloudinary.com/abdraqeeb/image/upload/v1608847996/FoodStore%20Products/huwvuquyifasoggs61zz.jpg"
        ],
        description: "Lorem ipsum",
        price: 400,
        cost: 480,
        countInStock: 35
    },
    {
        _id: "5fe5a36a8c1ca1209c48f7ed",
        user: "5fe5a36a8c1ca1209c48f7bd",
        category: "5fe5a36a8c1ca1209c48f7da",
        name: "Plantain Chips",
        brand: "Zee foods",
        unit: "1 pc",
        images: [
            "https://res.cloudinary.com/abdraqeeb/image/upload/v1608847989/FoodStore%20Products/sssp3xe5xvkf4h0gwpq2.jpg",
            "https://res.cloudinary.com/abdraqeeb/image/upload/v1608847992/FoodStore%20Products/lqfbfk0otrikeivzdugi.jpg",
            "https://res.cloudinary.com/abdraqeeb/image/upload/v1608847996/FoodStore%20Products/huwvuquyifasoggs61zz.jpg"
        ],
        description: "Lorem ipsum",
        price: 95,
        cost: 100,
        countInStock: 80
    },
    {
        _id: "5fe5a36a8c1ca1209c48f7ee",
        user: "5fe5a36a8c1ca1209c48f7bd",
        category: "5fe5a36a8c1ca1209c48f7da",
        name: "Potato Chips",
        brand: "Zee Foods",
        unit: "1 pc",
        images: [
            "https://res.cloudinary.com/abdraqeeb/image/upload/v1608847989/FoodStore%20Products/sssp3xe5xvkf4h0gwpq2.jpg",
            "https://res.cloudinary.com/abdraqeeb/image/upload/v1608847992/FoodStore%20Products/lqfbfk0otrikeivzdugi.jpg",
            "https://res.cloudinary.com/abdraqeeb/image/upload/v1608847996/FoodStore%20Products/huwvuquyifasoggs61zz.jpg"
        ],
        description: "Lorem ipsum",
        price: 40,
        cost: 50,
        countInStock: 80
    },
];

export default products;