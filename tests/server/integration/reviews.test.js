import server from "../../utils/server.js";
import {connect, disconnect} from "../../utils/mongoose.js";
import User from "../../../models/User.js";
import Product from "../../../models/Product.js";
import Review from "../../../models/Review.js";
import {REVIEWS, LOGIN, PRODUCTS} from "../../utils/endpoints.js";

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

const user2 = {
    _id: "5fd8977b6e708a0b3c13021f",
    username: "tester",
    name: "Test User",
    email: "tester@gmail.com",
    phone: "222-22-222",
    role: "user",
    image: "https://res.cloudinary.com/abdraqeeb/image/upload/v1602340141/Dispatch%20Users/ibc0hkyobju8bdiioe5n.png",
    password: "123456"
};

const product = {
    _id: "5fd85d9c9ffe45173c3e44dd",
    name: 'Test Product',
    brand: 'Test Brand',
    description: 'Test Product',
    price: 400,
    cost: 500,
    images: ['image.png'],
    unit: '12 pcs',
    user: "5fd85d9c9ffe45173c3e44e1",
    category: "5fd85d9c9ffe45173c3e44e2"
};
const review = {
    title: 'Test Review',
    text: 'Lorem ipsum',
    rating: 5
};

let createdUser;
let createdProd;
let token;
let id;

beforeAll(async () => {
    await connect();
    await User.deleteMany({});
    await Product.deleteMany({});
    await User.create(user2);
    createdUser = await User.create(user);
    createdProd = await Product.create(product);
});

const exec = async () => {
    const response = await server().post(LOGIN).send({username: user.username, password: user.password});
    return response.body;
};

const execUser = async () => {
    const response = await server().post(LOGIN).send({username: user2.username, password: user2.password});
    return response.body;
};

describe('Reviews Endpoint', () => {
    describe('Get reviews', () => {
        it('should get all reviews', async () => {
            const response = await server().get(REVIEWS);

            expect(response.status).toBe(200);
            expect(response.body).toMatchObject({success: true, count: 0, pagination: {}, data: []});
        });
    });

    describe('Add Review', () => {
        it('should add review', async () => {
            const result = await exec();
            token = result.token;

            const response = await server().post(`${PRODUCTS}/${createdProd._id}/reviews`).send(review).set('Authorization', `Bearer ${token}`);

            // set id to var
            id = response.body.data._id;

            expect(response.status).toBe(201);
            expect(response.body).toMatchObject({success: true, data: review});
        });

        it('should return 404 for product not found', async () => {
            const result = await exec();
            token = result.token;

            const response = await server().post(`${PRODUCTS}/5fd85d9c9ffe45173c3e44e2/reviews`).send(review).set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(404);
            expect(response.body).toMatchObject({success: false, error: `No product with ID: 5fd85d9c9ffe45173c3e44e2`});
        });
    });

    describe('Get Product Reviews', () => {
        it('should return product reviews', async () => {
            const response = await server().get(`${PRODUCTS}/${createdProd._id}/reviews`);

            expect(response.status).toBe(200);
            expect(response.body).toMatchObject({success: true, count: 1, data: [review] });
        });
    });

    describe('Get Single Review', () => {
        it('should return review with given id', async () => {
            const response = await server().get(`${REVIEWS}/${id}`);

            expect(response.status).toBe(200);
            expect(response.body).toMatchObject({success: true, data: review});
        });

        it('should return 404 for review not found', async () => {
            const response = await server().get(`${REVIEWS}/5fd85d9c9ffe45173c3e44e5`);

            expect(response.status).toBe(404);
            expect(response.body).toMatchObject({success: false, error: `No review found with ID: 5fd85d9c9ffe45173c3e44e5`});
        });
    });

    describe('Update Review', () => {
        it('should update review', async () => {
            const result = await exec();
            token = result.token;

            review.title = 'Test update';

            const response = await server().put(`${REVIEWS}/${id}`).send({title: 'Test update'}).set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(200);
            expect(response.body).toMatchObject({success: true, data: review});
        });

        it('should return 401 when review does not belong to user', async () => {
            const result = await execUser();
            token = result.token;

            review.title = 'Test update';

            const response = await server().put(`${REVIEWS}/${id}`).send({title: 'Test update'}).set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(401);
            expect(response.body).toMatchObject({success: false, error: `Not authorized to update review`});
        });

        it('should return 404 for review not found', async () => {
            const result = await exec();
            token = result.token;

            review.title = 'Test update';

            const response = await server().put(`${REVIEWS}/5fd85d9c9ffe45173c3e44e6`).send({title: 'Test update'}).set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(404);
            expect(response.body).toMatchObject({success: false, error: `No review with ID: 5fd85d9c9ffe45173c3e44e6`});
        });
    });

    describe('Delete Review', () => {
        it('should return 401 when review does not belong to user', async () => {
            const result = await execUser();
            token = result.token;

            const response = await server().delete(`${REVIEWS}/${id}`).set('Authorization', `Bearer ${token}`);
            //
            expect(response.status).toBe(401);
            expect(response.body).toMatchObject({success: false, error: `Not authorized to update review`});
        });

        it('should delete review', async () => {
            const result = await exec();
            token = result.token;

            const response = await server().delete(`${REVIEWS}/${id}`).set('Authorization', `Bearer ${token}`);
            //
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject({success: true, data: {}});
        });

        it('should return 404 for review not found', async () => {
            const result = await exec();
            token = result.token;

            const response = await server().delete(`${REVIEWS}/${id}`).set('Authorization', `Bearer ${token}`);
            //
            expect(response.status).toBe(404);
            expect(response.body).toMatchObject({success: false, error: `No review with ID: ${id}`});
        });
    });
});


afterAll(async () => {
    await User.deleteMany({});
    await Review.deleteMany({});
    await Product.deleteMany({});
    await disconnect();
});