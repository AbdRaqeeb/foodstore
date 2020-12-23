import 'dotenv/config.js';
import jwt from 'jsonwebtoken';
import User from "../../../models/User.js";
import {connect, disconnect} from "../../utils/mongoose.js";

let createdUser;

const user = {
    name: 'Test User',
    username: 'test',
    email: 'test@gmail.com',
    password: '123456'
};

beforeAll(async () => {
    await connect();
});

beforeEach(async () => {
    await User.deleteMany({});
    createdUser = await User.create(user);
});

describe('The User Model', () => {
    it('should hash the password before saving to the database', async () => {
        const result = await createdUser.matchPassword(user.password);

        expect(result).toBe(true)
    });

    describe('User Schema Methods', () => {
        it('should return valid signed jwt token', async () => {
            const token = createdUser.getSignedJwtToken();

            const {id} = jwt.verify(token, process.env.JWT_SECRET);

            expect(id).toEqual(JSON.parse(JSON.stringify(createdUser._id)));
        });

        it('should return password reset token', async () => {
            const token = createdUser.getResetPasswordToken();

            expect(token).toEqual(expect.any(String));
        });

        it('should return email confirmation token', () => {
            const token = createdUser.generateEmailConfirmToken();

            expect(token).toEqual(expect.any(String));
            expect(token).toContain('.');
        })
    });
});

afterAll(async () => {
    await User.deleteMany({});
    await disconnect();
});