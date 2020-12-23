import server from "../../utils/server.js";
import {
    REGISTER,
    LOGIN,
    LOGOUT,
    GET_ME,
    UPDATE_USER,
    UPLOAD_PHOTO,
    UPDATE_PASSWORD,
    FORGOT_PASSWORD,
    RESET_PASSWORD,
    CONFIRM_EMAIL
} from "../../utils/endpoints.js";
import User from "../../../models/User.js";
import {disconnect} from "../../utils/mongoose.js";
import colors from 'colors';

let user = {
    _id: "5fdb8955454d952380e4c6fd",
    username: "test",
    name: "Test User",
    email: "test@gmail.com",
    phone: "222-22-222",
    role: "user",
    image: "https://res.cloudinary.com/abdraqeeb/image/upload/v1602340141/Dispatch%20Users/ibc0hkyobju8bdiioe5n.png",
    password: "123456"
};

jest.mock('../../../utils/sendEmail.js');
jest.mock('cloudinary-simple-upload');

let token;
const exec = async () => {
    const log = {
        username: 'test',
        password: '123456'
    };
    const response = await server().post(LOGIN).send(log);
    return response;
};


describe('Auth Endpoint', () => {
    describe('Register', () => {
        it('should register user successfully', async () => {
            await User.deleteMany({});
            const response = await server().post(REGISTER).send(user);

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('success', true);
            expect(response.body).toHaveProperty('token');
            expect(response.body).toHaveProperty('data');
        });

        it('should return username exist for an already registered user', async () => {
            const response = await server().post(REGISTER).send(user);

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('success', false);
            expect(response.body).toHaveProperty('error', `The username ${user.username} is already taken`);
        });
    });

    describe('Login', () => {
        it('should login successfully', async () => {
            const log = {
                username: 'test',
                password: '123456'
            };

            const response = await server().post(LOGIN).send(log);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('token');
            expect(response.body).toHaveProperty('success', true);
            expect(response.body).toHaveProperty('data');
        });

        it('should return 400 for not providing all credentials', async () => {
            const log = {
                username: 'test'
            };

            const response = await server().post(LOGIN).send(log);

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('success', false);
            expect(response.body).toHaveProperty('error', 'Please provide a username and password');
        });

        it('should return invalid credentials for wrong username provided', async () => {
            const log = {
                username: 'fail',
                password: '123456'
            };

            const response = await server().post(LOGIN).send(log);

            expect(response.status).toBe(401);
            expect(response.body).toMatchObject({success: false, error: 'Invalid credentials'});
        });

        it('should return invalid credentials for wrong password provided', async () => {
            const log = {
                username: 'test',
                password: '12345'
            };

            const response = await server().post(LOGIN).send(log);

            expect(response.status).toBe(401);
            expect(response.body).toMatchObject({success: false, error: 'Invalid credentials'});
        });
    });

    describe('Logout', () => {
        it('should clear cookies on logout', async () => {
            const response = await server().post(LOGOUT);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('success', true);
            expect(response.body).toHaveProperty('data', {});
        });
    });

    describe('Get Me', () => {
        it('should return no authorization if no token or invalid token is provided', async () => {
            const response = await server().get(GET_ME);

            expect(response.status).toBe(401);
            expect(response.body).toHaveProperty('success', false);
            expect(response.body).toHaveProperty('error', 'Not authorized to access this route');
        });

        it('should return user details', async () => {
            const result = await exec();
            token = result.body.token;

            const response = await server().get(GET_ME).set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('success', true);
            expect(response.body).toHaveProperty('data');
        });
    });

    describe('Update User', () => {
        it('should return updated user', async () => {
            const result = await exec();
            token = result.body.token;

            const update = {
                name: 'Test Name'
            };

            const response = await server().put(UPDATE_USER).send(update).set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('success', true);
            expect(response.body).toHaveProperty('data');
            expect(response.body.data).toMatchObject({name: 'Test Name'});
        });

        it('should return no authorization if no token or invalid token is provided', async () => {
            const update = {
                name: 'Test Name'
            };

            const response = await server().put(UPDATE_USER).send(update);

            expect(response.status).toBe(401);
            expect(response.body).toHaveProperty('success', false);
            expect(response.body).toHaveProperty('error', 'Not authorized to access this route');
        });
    });

    describe('Upload photo', () => {
        it('should upload image successfully', async () => {
            const file = `C:\\Users\\acer\\Desktop\\AbdRaqeeb\\cajeq\\tests\\utils\\user1.png`;

            const result = await exec();
            token = result.body.token;

            const response = await server().put(UPLOAD_PHOTO).attach('image', file).set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(200);
        });
        it('should return 400 without image upload', async () => {
            const result = await exec();
            token = result.body.token;

            const response = await server().put(UPLOAD_PHOTO).set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('success', false);
            expect(response.body).toHaveProperty('error', 'Please upload an image');
        });
    });

    describe('Update Password', () => {
        it('should update password successfully', async () => {
            const changePassword = {
                currentPassword: '123456',
                newPassword: '123456'
            };

            const result = await exec();
            token = result.body.token;

            const response = await server().put(UPDATE_PASSWORD).send(changePassword).set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('success', true);
            expect(response.body).toHaveProperty('token');
            expect(response.body).toHaveProperty('data');
        });

        it('return 401 if current password is wrong', async () => {
            const changePassword = {
                currentPassword: '12345',
                newPassword: '123456'
            };

            const result = await exec();
            token = result.body.token;

            const response = await server().put(UPDATE_PASSWORD).send(changePassword).set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(401);
            expect(response.body).toHaveProperty('success', false);
            expect(response.body).toHaveProperty('error', 'Password is incorrect');
        });
    });

    describe('Forget Password', () => {
        it('should send email for password reset token', async () => {
            const result = await exec();
            token = result.body.token;

            const req = {
              email: 'test@gmail.com'
            };

            const response = await server().post(FORGOT_PASSWORD).send(req).set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(200);
        });

        it('should return 404 if email does not exist', async () => {
            const result = await exec();
            token = result.body.token;

            const req = {
                email: 'test2@gmail.com'
            };

            const response = await server().post(FORGOT_PASSWORD).send(req).set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(404);
            expect(response.body).toHaveProperty('success', false);
            expect(response.body).toHaveProperty('error', 'There is no user with that email');
        });
    });

    describe('Reset Password', () => {
        it('should return 400 password with wrong reset token', async () => {
            const result = await exec();
            let resetToken = result.body.data.resetPasswordToken;


            const req = {
                password: '123456'
            };

            const response = await server().put(`${RESET_PASSWORD}/${resetToken}`).send(req);

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('success', false);
            expect(response.body).toHaveProperty('error', 'Invalid token');

        });
    });

    describe('Confirm Email',  () => {
        it('should return 400 with wrong confirm email token', async () => {
            const result = await exec();
            let confirmationToken = result.body.data.confirmEmailToken;

            const response = await server().get(`${CONFIRM_EMAIL}?token=${confirmationToken}`);

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('success', false);
            expect(response.body).toHaveProperty('error', 'Invalid Token');
        });
    });
});

afterAll(async () => {
    await User.deleteMany({});
    await disconnect();
});