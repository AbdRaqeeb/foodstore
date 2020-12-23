import server from "../../utils/server.js";
import {connect, disconnect} from "../../utils/mongoose.js";
import User from "../../../models/User.js";
import {LOGIN, USERS} from "../../utils/endpoints.js";

jest.mock('../../../utils/sendEmail.js');

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

const test = {
    _id: "5fdb8955454d952380e4c6fe",
    username: "test2",
    name: "Test User2",
    email: "test2@gmail.com",
    phone: "333-33-333",
    role: "user",
    image: "https://res.cloudinary.com/abdraqeeb/image/upload/v1602340141/Dispatch%20Users/ibc0hkyobju8bdiioe5n.png",
    password: "123456"
};

let token;
let id;

beforeAll(async () => {
    await connect();
    await User.deleteMany({});
    await User.create(user);
});

const exec = async () => {
    const response = await server().post(LOGIN).send({username: user.username, password: user.password});
    return response.body;
};

describe('Users Endpoint', () => {
    describe('Get Users', () => {
        it('should return all users', async () => {
            const result = await exec();
            token = result.token;

            const response = await server().get(USERS).set('Authorization', `Bearer ${token}`);

            delete user['password'];

            expect(response.status).toBe(200);
            expect(response.body).toMatchObject({success: true, count: 1, pagination: {}, data: [user]});
        });
    });

    describe('Get User', () => {
        it('should return user', async () => {
            // add password back to user
            user.password = '123456';

            const result = await exec();
            token = result.token;

            //store id in var
            id = result.data._id;

            // remove password again
            delete user['password'];

            const response = await server().get(`${USERS}/${id}`).set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(200);
            expect(response.body).toMatchObject({success: true, data: user});
        });
    });

    describe('Create User', () => {
        it('should create user', async () => {
            // add password back to user
            user.password = '123456';

            const result = await exec();
            token = result.token;

            const response = await server().post(USERS).send(test).set('Authorization', `Bearer ${token}`);

            // set id to id
            id = response.body.data._id;

            // remove password field from test
            delete test['password'];

            expect(response.status).toBe(201);
            expect(response.body).toMatchObject({success: true, data: test});
        });
    });

    describe('Update User', () => {
        it('should update user', async () => {
            const result = await exec();
            token = result.token;

            test.name = 'Update test';

            const response = await server().put(`${USERS}/${id}`).send({name: 'Update test'}).set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(200);
            expect(response.body).toMatchObject({success: true, data: test});
        });

        it('should return 404 for user not found', async () => {
            const result = await exec();
            token = result.token;

            test.name = 'Update test';

            const response = await server().put(`${USERS}/5fd85d9c9ffe45173c3e44dc`).send({name: 'Update test'}).set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(404);
            expect(response.body).toMatchObject({success: false, error: `User with the ID: 5fd85d9c9ffe45173c3e44dc not found`});
        });
    });

    describe('Delete User', () => {
        it('should delete user', async () => {
            const result = await exec();
            token = result.token;

            const response = await server().delete(`${USERS}/${id}`).set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(200);
            expect(response.body).toMatchObject({success: true, data: {}});
        });

        it('should return user not found', async () => {
            const result = await exec();
            token = result.token;

            const response = await server().delete(`${USERS}/${id}`).set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(404);
            expect(response.body).toMatchObject({success: false, error: `User with the ID ${id} not found`});
        });
    });
});


afterAll(async () => {
    await User.deleteMany({});
    await disconnect();
});