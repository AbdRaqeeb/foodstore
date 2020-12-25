import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import fileUpload from 'express-fileupload';
import {config} from 'cloudinary-simple-upload';
import cors from 'cors';
import mongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import hpp from 'hpp';
import rateLimit from 'express-rate-limit';
import xss from 'xss-clean';
import {errorHandler} from '../middleware/error.js';
import connectDB from '../config/db.js';
import 'dotenv/config.js';

// connect to database
connectDB();

// connect to cloudinary
config(process.env.CLOUD_NAME, process.env.API_KEY, process.env.API_SECRET);

// Import routes
import auth from '../routes/auth.js'
import users from '../routes/users.js';
import orders from '../routes/orders.js';
import products from '../routes/products.js';
import reviews from '../routes/reviews.js';
import categories from '../routes/categories.js';

const app = express();

//Body parser
app.use(express.json({extended: false}));

// file upload
app.use(fileUpload());

// Cookie parser
app.use(cookieParser());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet({
        contentSecurityPolicy: false,
    }
));

// Prevent XSS attacks
app.use(xss());

// Rate limiting
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 mins
    max: 100
});
app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors());

// Set static folder
app.use(express.static('public'));

// Mount routers
app.use('/api/v1/users', users);
app.use('/api/v1/auth', auth);
app.use('/api/v1/categories', categories);
app.use('/api/v1/products', products);
app.use('/api/v1/orders', orders);
app.use('/api/v1/reviews', reviews);

app.use(errorHandler);

export default app;