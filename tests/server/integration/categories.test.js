import server from "../../utils/server.js";
import Category from "../../../models/Category.js";
import {disconnect} from "../../utils/mongoose.js";
import {CATEGORIES, REGISTER} from "../../utils/endpoints.js";
import User from "../../../models/User.js";


jest.mock('../../../utils/sendEmail.js');

let token;
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


const exec = async () => {
    const response = await server().post(REGISTER).send(user);
    return response.body;
};

beforeEach(async () => {
    await User.deleteMany({});
});

describe('Category Endpoint', () => {
    describe('Get Category', () => {
        it('should return all categories available', async () => {
            const response = await server().get(CATEGORIES);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('success', true);
            expect(response.body).toHaveProperty('pagination');
            expect(response.body).toHaveProperty('count');
            expect(response.body).toHaveProperty('data');
        });
    });

    describe('Add Category', () => {
        it('should add category successfully', async () => {
            const result = await exec();
            token = result.token;

            const response = await server().post(CATEGORIES).send(category).set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('success', true);
            expect(response.body.data).toMatchObject(category);
        });
    });

    describe('Get Single Category', () => {
        it('should return single category', async () => {
            const response = await server().get(`${CATEGORIES}/${category._id}`);

            expect(response.status).toBe(200);
            expect(response.body).toMatchObject({success: true, data: category});
        });

        it('should return category not found for non existent category id', async () => {
            const response = await server().get(`${CATEGORIES}/5fd85d9c9ffe45173c3e44d4`);

            expect(response.status).toBe(404);
            expect(response.body).toMatchObject({success: false, error: 'Category with the ID: 5fd85d9c9ffe45173c3e44d4 not found'})
        });
    });

    describe('Update Category', () => {
        it('should update category', async () => {
            user.role = 'admin';
            const result = await exec();
            token = result.token;

            category.name = 'Update Category';

            const response = await server().put(`${CATEGORIES}/${category._id}`).send(category).set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(200);
            expect(response.body).toMatchObject({success: true, data: category});
        });

        it('should return 404 for non existent category id', async () => {
            user.role = 'admin';
            const result = await exec();
            token = result.token;

            category.name = 'Update Category';

            const response = await server().put(`${CATEGORIES}/5fd85d9c9ffe45173c3e44d4`).send(category).set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(404);
            expect(response.body).toMatchObject({success: false, error: 'Category with the ID: 5fd85d9c9ffe45173c3e44d4 not found'})
        });
    });

    describe('Delete Category', () => {
        it('should delete category', async () => {
            user.role = 'admin';
            const result = await exec();
            token = result.token;

            const response = await server().delete(`${CATEGORIES}/${category._id}`).set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(200);
            expect(response.body).toMatchObject({success: true, data: {}});
        });

        it('should return 404 for category not found', async () => {
            user.role = 'admin';
            const result = await exec();
            token = result.token;

            const response = await server().delete(`${CATEGORIES}/5fd85d9c9ffe45173c3e44d4`).set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(404);
            expect(response.body).toMatchObject({success: false, error: 'Category with the ID: 5fd85d9c9ffe45173c3e44d4 not found'})
        });
    });
});


afterAll(async () => {
    await Category.deleteMany({});
    await User.deleteMany({});
    await disconnect();
});