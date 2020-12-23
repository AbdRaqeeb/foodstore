import jwt from 'jsonwebtoken';
import {protect} from "../../../middleware/auth.js";
import {connect, disconnect} from "../../utils/mongoose.js";
import User from "../../../models/User.js";
import ErrorResponse from "../../../utils/errorResponse.js";
import {authorize} from "../../../middleware/auth";

let token;
let user = {
    name: 'Test User',
    username: 'test',
    email: 'test@gmail.com',
    password: '123456'
};
let createdUser;

beforeAll(async () => {
    await connect();
});

const exec = async () => {
    await User.deleteMany({});
    createdUser = await User.create(user);
    token = createdUser.getSignedJwtToken();
};

let req = {
    headers: {}
};
const res = {};
const next = jest.fn();

describe('Auth Middleware', () => {
    describe('Protect', () => {
        it('should populate req.user with the payload of a valid token', async () => {
            await exec();
            req.headers.authorization = `Bearer ${token}`;


            await protect(req, res, next);

            //remove password from user object because it will be hashed on save
            user = {
                name: 'Test User',
                username: 'test',
                email: 'test@gmail.com'
            };

            expect(req.user).toMatchObject(user);
        });

        it('should return error when no token is provided', async () => {
            req.headers.authorization = undefined;

            await protect(req, res, next);

            expect(next).toHaveBeenCalledWith(new ErrorResponse('Not authorized to access this route', 401));
        });
    });
});


afterAll(async () => {
    await User.deleteMany({});
    await disconnect();
});

