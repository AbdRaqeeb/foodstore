import slugify from "slugify";
import Product from "../../../models/Product.js";
import {connect, disconnect} from "../../utils/mongoose.js";
import Category from "../../../models/Category.js";
import User from "../../../models/User.js";

let createdProd;
let createdCat;
let createdUser;

const product = {
    name: 'Test Product',
    images: ['https://res.cloudinary.com/abdraqeeb/image/upload/v1600287614/FastFood%20Admin/o3q91psl9b2p5zu5db4c.jpg'],
    brand: 'Test Brand',
    description: 'Test Product',
    price: 400,
    cost: 500
};

const category = {
    name: 'Grains',
    description: 'grainy foods',
    numProducts: 5
};

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
    await Product.deleteMany({});
    await Category.deleteMany({});
    await User.deleteMany({});
    createdCat = await Category.create(category);
    createdUser = await User.create(user);
});

describe('Product Model', () => {
    it('should add slug before saving', async () => {
        product.user = createdUser._id;
        product.category = createdCat._id;
        createdProd = await Product.create(product);

        const slug = slugify(product.name, {lower: true});

        expect(createdProd.slug).toEqual(slug);
    });

    it('should calculate discount before saving', async () => {
        product.user = createdUser._id;
        product.category = createdCat._id;
        createdProd = await Product.create(product);

        expect(createdProd.discount).toBe(20);
    });
});

afterAll(async () => {
    await Product.deleteMany({});
    await User.deleteMany({});
    await Category.deleteMany({});
    await disconnect();
});