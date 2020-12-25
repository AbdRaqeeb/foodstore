import server from "../../utils/server.js";
import {connect, disconnect} from "../../utils/mongoose.js";
import Category from "../../../models/Category.js";
import Product from "../../../models/Product.js";
import User from "../../../models/User.js";
import {CATEGORIES, LOGIN, PRODUCTS} from "../../utils/endpoints";


jest.mock('cloudinary-simple-upload');

// data
const user = {
    _id: "5fdb8955454d952380e4c6fd",
    username: "test",
    name: "Test User",
    email: "test@gmail.com",
    phone: "222-22-222",
    role: "admin",
    image: "https://res.cloudinary.com/abdraqeeb/image/upload/v1602340141/Dispatch%20Users/ibc0hkyobju8bdiioe5n.png",
    password: "123456"
};
const category = {
    _id: "5fd85d9c9ffe45173c3e44d3",
    name: 'Test Category',
    description: 'Lorem ipsum'
};
const product = {
    name: 'Test Product',
    brand: 'Test Brand',
    description: 'Test Product',
    price: 400,
    cost: 500,
    unit: '12 pcs'
};

// variables
let token;
let id;
let createdCat;

beforeAll(async () => {
    await connect();
    await User.deleteMany({});
    await User.create(user);
    createdCat = await Category.create(category);
});

const exec = async () => {
    const response = await server().post(LOGIN).send({username: user.username, password: user.password});
    return response.body;
};

describe('Product Endpoint', () => {
    describe('Add Products', () => {
        it('should add product successfully', async () => {
            const result = await exec();
            token = result.token;

            // image root path
            const file = `C:\\Users\\acer\\Desktop\\AbdRaqeeb\\foodstore\\tests\\utils\\user1.png`;

            const response = await server()
                .post(`${CATEGORIES}/${createdCat._id}/products`)
                .field('name', product.name)
                .field('brand', product.brand)
                .field('description', product.description)
                .field('price', product.price)
                .field('cost', product.cost)
                .field('unit', product.unit)
                .attach('images', file)
                .attach('images', file)
                .set('Authorization', `Bearer ${token}`);

            id = response.body.data._id;

            expect(response.status).toBe(201);
            expect(response.body).toMatchObject({success: true, data: product});
        });

        it('should return 404 for categories not found', async () => {
            const result = await exec();
            token = result.token;

            // image root path
            const file = `C:\\Users\\acer\\Desktop\\AbdRaqeeb\\foodstore\\tests\\utils\\user1.png`;

            const response = await server()
                .post(`${CATEGORIES}/5fd85d9c9ffe45173c3e44d5/products`)
                .field('name', product.name)
                .field('brand', product.brand)
                .field('description', product.description)
                .field('price', product.price)
                .field('cost', product.cost)
                .field('unit', product.unit)
                .attach('images', file)
                .attach('images', file)
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(404);
            expect(response.body).toMatchObject({
                success: false,
                error: `Category with ID: 5fd85d9c9ffe45173c3e44d5 not found`
            });
        });

        it('should return 400 for images not uploaded', async () => {
            const result = await exec();
            token = result.token;

            const response = await server()
                .post(`${CATEGORIES}/${createdCat._id}/products`)
                .field('name', product.name)
                .field('brand', product.brand)
                .field('description', product.description)
                .field('price', product.price)
                .field('cost', product.cost)
                .field('unit', product.unit)
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(400);
            expect(response.body).toMatchObject({
                success: false,
                error: `Please upload product images. More than one (1).`
            });
        });
    });

    describe('Get Products', () => {
        it('should return all products', async () => {
            const response = await server().get(PRODUCTS);

            expect(response.status).toBe(200);
            expect(response.body).toMatchObject({success: true, count: 1, pagination: {}, data: [product]});
        });

        it('should return products in a category', async () => {
            const response = await server().get(`${CATEGORIES}/${createdCat._id}/products`);

            expect(response.status).toBe(200);
            expect(response.body).toMatchObject({success: true, count: 1, data: [product]});
        });
    });

    describe('Get Single Product', () => {
        it('should return a product', async () => {
            const response = await server().get(`${PRODUCTS}/${id}`);

            expect(response.status).toBe(200);
            expect(response.body).toMatchObject({success: true, data: product});
        });

        it('should return 404 for product not found', async () => {
            const response = await server().get(`${PRODUCTS}/5fd85d9c9ffe45173c3e44d8`);

            expect(response.status).toBe(404);
            expect(response.body).toMatchObject({success: false, error: `Product with ID: 5fd85d9c9ffe45173c3e44d8 not found`});
        });
    });

    describe('Get Top Products', () => {
        it('should return top products', async () => {
            const response = await server().get(`${PRODUCTS}/top`);

            expect(response.status).toBe(200);
            expect(response.body).toMatchObject({success: true, count: 1, data: [product]});
        });
    });

    describe('Update Product', () => {
        it('should update product successfully', async () => {
            const result = await exec();
            token = result.token;
            product.name = 'Update name';

            const response = await server().put(`${PRODUCTS}/${id}`).send({name: 'Update name'}).set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(200);
            expect(response.body).toMatchObject({success: true, data: product});
        });

        it('should return 400 if only one image is uploaded', async () => {
            const result = await exec();
            token = result.token;

            // image root path
            const file = `C:\\Users\\acer\\Desktop\\AbdRaqeeb\\foodstore\\tests\\utils\\user1.png`;

            const response = await server().put(`${PRODUCTS}/${id}`).attach('images', file).set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(400);
            expect(response.body).toMatchObject({success: false, error: `Please upload product images. More than one (1).`});
        });

        it('should return 404 for product not found', async () => {
            const result = await exec();
            token = result.token;

            const response = await server().put(`${PRODUCTS}/5fd85d9c9ffe45173c3e44d8`).send({name: 'Update name'}).set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(404);
            expect(response.body).toMatchObject({success: false, error: `Product with ID: 5fd85d9c9ffe45173c3e44d8 not found`});
        });
    });

    describe('Delete Product', () => {
        it('should delete product successfully', async () => {
            const result = await exec();
            token = result.token;

            const response = await server().delete(`${PRODUCTS}/${id}`).set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(200);
            expect(response.body).toMatchObject({success: true, data: {}});
        });

        it('should return 404 for product not found', async () => {
            const result = await exec();
            token = result.token;

            const response = await server().delete(`${PRODUCTS}/${id}`).set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(404);
            expect(response.body).toMatchObject({success: false, error: `Product with ID: ${id} not found`});
        });
    });
});

afterAll(async () => {
    await User.deleteMany({});
    await Category.deleteMany({});
    await Product.deleteMany({});
    await disconnect();
});