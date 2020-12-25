import server from "../../utils/server.js";
import {connect, disconnect} from "../../utils/mongoose.js";
import Order from "../../../models/Order.js";
import User from "../../../models/User.js";
import Product from "../../../models/Product.js";
import {ORDERS, LOGIN} from "../../utils/endpoints.js";

jest.mock('../../../utils/paystack.js');
jest.mock('paystack-node');

// variables
let token;
let id;
let createdUser;
let createdAdmin;
let createdProd;

// data
const user = {
    _id: "5fdb8955454d952380e4c6fd",
    username: "test",
    name: "Test User",
    email: "test@gmail.com",
    phone: "222-22-222",
    role: "user",
    image: "https://res.cloudinary.com/abdraqeeb/image/upload/v1602340141/Dispatch%20Users/ibc0hkyobju8bdiioe5n.png",
    password: "123456"
};
// data
const user2 = {
    _id: "5fd8977b6e708a0b3c13021e",
    username: "tester",
    name: "Test User",
    email: "tester@gmail.com",
    phone: "222-22-222",
    role: "user",
    image: "https://res.cloudinary.com/abdraqeeb/image/upload/v1602340141/Dispatch%20Users/ibc0hkyobju8bdiioe5n.png",
    password: "123456"
};
const admin = {
    _id: "5fd8977b6e708a0b3c130216",
    username: "admin",
    name: "Test Admin",
    email: "admin@gmail.com",
    phone: "222-22-222",
    role: "admin",
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
    user: "5fd85d9c9ffe45173c3e44e1",
    category: "5fd85d9c9ffe45173c3e44e2"
};
const order = {
    _id: "5fd8977b6e708a0b3c130218",
    orderItems: [
        {
            name: 'Test Product',
            qty: 1,
            price: 200,
            product: '5fd85d9c9ffe45173c3e44dd'
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
    await User.deleteMany({});
    await Product.deleteMany({});
    await User.create(user2);
    createdUser = await User.create(user);
    createdAdmin = await User.create(admin);
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

const execAdmin = async () => {
    const response = await server().post(LOGIN).send({username: admin.username, password: admin.password});
    return response.body;
};

describe('Order Endpoint', () => {
    describe('Get Orders', () => {
        it('should return orders', async () => {
            const result = await execAdmin();
            token = result.token;

            const response = await server().get(ORDERS).set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(200);
            expect(response.body).toMatchObject({success: true, pagination: {}, data: []});
        });
    });

    describe('Add Order', () => {
        it('should add order', async () => {
            const result = await exec();
            token = result.token;

            const response = await server().post(ORDERS).send(order).set('Authorization', `Bearer ${token}`);

            //set id to var
            id = response.body.data._id;

            order.orderItems[0].product = {
                _id: "5fd85d9c9ffe45173c3e44dd",
                name: 'Test Product',
                brand: 'Test Brand',
                price: 400
            };

            expect(response.status).toBe(201);
            expect(response.body).toMatchObject({success: true, data: order});
        });

        it('should return 404 for order without order item', async () => {
            const result = await exec();
            token = result.token;

            order.orderItems = [];

            const response = await server().post(ORDERS).send(order).set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(404);
            expect(response.body).toMatchObject({success: false, error: `No order items. Please add order items.`});
        });
    });

    describe('Get Single Order', () => {
        it('should return single order', async () => {
            const result = await exec();
            token = result.token;

            const response = await server().get(`${ORDERS}/${id}`).set('Authorization', `Bearer ${token}`);

            // add items to order
            order.orderItems =  [
                {
                    name: 'Test Product',
                    qty: 1,
                    price: 200,
                    product: {
                        _id: "5fd85d9c9ffe45173c3e44dd",
                        name: 'Test Product',
                        brand: 'Test Brand',
                        price: 400
                    }
                }
            ];

            expect(response.status).toBe(200);
            expect(response.body).toMatchObject({success: true, data: order});
        });

        it('should return 401 when order does not belong to user', async () => {
            const result = await execUser();
            token = result.token;

            const response = await server().get(`${ORDERS}/${id}`).set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(401);
            expect(response.body).toMatchObject({success: false, error: `Not authorized to retrieve details of this order`});
        });

        it('should return 404 for order not found', async () => {
            const result = await exec();
            token = result.token;

            const response = await server().get(`${ORDERS}/5fd8977b6e708a0b3c13021a`).set('Authorization', `Bearer ${token}`);


            expect(response.status).toBe(404);
            expect(response.body).toMatchObject({success: false, error: `Order with ID: 5fd8977b6e708a0b3c13021a not found`});
        });
    });

    describe('Get My Orders', () => {
        it('should return user orders', async () => {
            const result = await exec();
            token = result.token;

            const response = await server().get(`${ORDERS}/user`).set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(200);
            expect(response.body).toMatchObject({success: true, data: [order]});
        });
    });

    describe('Update Order To Delivered', () => {
        it('should updated order to delivered', async () => {
            const result = await execAdmin();
            token = result.token;

            order.isDelivered = true;
            order.status = 'delivered';

            const response = await server().put(`${ORDERS}/${id}/deliver`).set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(200);
            expect(response.body).toMatchObject({success: true, data: order});
        });

        it('should return 404 for order not found', async () => {
            const result = await execAdmin();
            token = result.token;

            order.isDelivered = true;
            order.status = 'delivered';

            const response = await server().put(`${ORDERS}/5fd8977b6e708a0b3c13021b/deliver`).set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(404);
            expect(response.body).toMatchObject({success: false, error: `Order with ID 5fd8977b6e708a0b3c13021b not found`});
        });
    });

    // describe('Update Order To Paid', () => {
    //     it('should update order to paid', async () => {
    //         order.isPaid = true;
    //
    //         const response = await server().put(`${ORDERS}/${id}/pay`).send({reference: 'WTETYE78EGE637'});
    //
    //         console.log('RES', response.body);
    //
    //         expect(response.status).toBe(200);
    //         expect(response.body).toMatchObject({success: true, data: order});
    //     });
    // });

    describe('Update Order Status', () => {
        it('should update order status', async () => {
            const result = await execAdmin();
            token = result.token;

            const response = await server().put(`${ORDERS}/${id}/status`).send({status: 'processing'}).set('Authorization', `Bearer ${token}`);

            order.status = 'processing';

            expect(response.status).toBe(200);
            expect(response.body).toMatchObject({success: true, data: order});
        });

        it('should return 404 for order not found', async () => {
            const result = await execAdmin();
            token = result.token;

            const response = await server().put(`${ORDERS}/5fd8977b6e708a0b3c13021c/status`).send({status: 'processing'}).set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(404);
            expect(response.body).toMatchObject({success: false, error: `Order with ID: 5fd8977b6e708a0b3c13021c not found`});
        });
    });

    describe('Delete Order', () => {
        it('should return 401 when order does not belong to user', async () => {
            const result = await execUser();
            token = result.token;

            const response = await server().delete(`${ORDERS}/${id}`).set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(401);
            expect(response.body).toMatchObject({success: false, error: `Not authorized to delete this order`});
        });

        it('should delete order', async () => {
            const result = await exec();
            token = result.token;

            const response = await server().delete(`${ORDERS}/${id}`).set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(200);
            expect(response.body).toMatchObject({success: true, data: {}});
        });

        it('should return 404 for order not found', async () => {
            const result = await exec();
            token = result.token;

            const response = await server().delete(`${ORDERS}/${id}`).set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(404);
            expect(response.body).toMatchObject({success: false, error: `Order with ID: ${id} not found`});
        });
    });
});

afterAll(async () => {
    await User.deleteMany({});
    await Product.deleteMany({});
    await Order.deleteMany({});
    await disconnect();
});