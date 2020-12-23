import Order from "../../../models/Order.js";
import Product from "../../../models/Product.js";
import User from "../../../models/User.js";
import {connect, disconnect} from "../../utils/mongoose.js";
import Category from "../../../models/Category";

let createdProd;
let createdCat;
let createdUser;
let createdOrder;

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

const order = {
    orderItems: [
        {
            name: 'Test Product',
            qty: 1,
            image: 'image.png',
            price: 200,
        }
    ],
    shippingAddress: {
        address: 'test address',
        city: 'test city',
        postalCode: '900201'
    }
};

beforeAll(async () => {
    await connect();
});

beforeEach(async () => {
    await Product.deleteMany({});
    await Category.deleteMany({});
    await User.deleteMany({});
    await Order.deleteMany({});
    createdCat = await Category.create(category);
    createdUser = await User.create(user);
    product.category = createdCat._id;
    product.user = createdUser._id;
    createdProd = await Product.create(product);
});

describe('Order Model', () => {
    it('should generate a random string for reference', async () => {
        order.user = createdUser._id;
        order.orderItems[0].product = createdProd._id;

        createdOrder = await Order.create(order);

        expect((createdOrder.reference).length).toEqual(15);
    });
});


afterAll(async () => {
    await Product.deleteMany({});
    await Category.deleteMany({});
    await User.deleteMany({});
    await Order.deleteMany({});
    await disconnect();
});