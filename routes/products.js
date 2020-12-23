import express from 'express';
import {
    addProduct,
    deleteProduct,
    updateProduct,
    getProduct,
    getProducts,
    getTopProducts
} from '../controllers/products.js';

const router = express.Router({mergeParams: true});

import {protect, authorize} from "../middleware/auth.js";

import advancedResults from "../middleware/advancedResults.js";

import Product from "../models/Product.js";

// import other routes
import reviewRouter from './reviews.js';

// re-route into other routes
router.use('/:productId/reviews', reviewRouter);

router.route('/top').get(getTopProducts);

router
    .route('/')
    .get(advancedResults(Product, {
        path: 'category',
        select: 'name numProducts'
    }), getProducts)
    .post(protect, authorize('admin'), addProduct);

router
    .route('/:id')
    .get(getProduct)
    .put(protect, authorize('admin'), updateProduct)
    .delete(protect, authorize('admin'), deleteProduct);

export default router;