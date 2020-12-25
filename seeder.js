import mongoose from 'mongoose';
import colors from 'colors';
import 'dotenv/config.js';

// import models
import User from "./models/User.js";
import Product from "./models/Product.js";
import Order from "./models/Order.js";
import Review from "./models/Review.js";
import Category from "./models/Category.js";

// import data
import users from "./data/users.js";
import reviews from "./data/reviews.js";
import products from "./data/products.js";
import categories from "./data/categories.js";
import orders from "./data/orders.js";

// connect to db
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});


// seed data
const importData = async () => {
    try {
        await User.create(users);
        await Category.create(categories);
        await Product.create(products);
        await Review.create(reviews);
        await Order.create(orders);

        console.log('Data Imported...'.green.inverse);
        process.exit();
    } catch (e) {
        console.error(e);
    }
};

// destroy data
const deleteData = async () => {
    try {
        await User.deleteMany({});
        await Product.deleteMany({});
        await Category.deleteMany({});
        await Review.deleteMany({});
        await Order.deleteMany({});

        console.log('Data Destroyed...'.red.inverse);
        process.exit();
    } catch (e) {
        console.error(e);
    }
};

if (process.argv[2] === '-d') {
    deleteData();
} else if (process.argv[2] === '-i') {
    importData();
}
