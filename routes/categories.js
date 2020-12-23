import express from 'express';
import {addCategory, updateCategory, getCategory, getCategories, deleteCategory} from '../controllers/categories.js';

const router = express.Router();

import {protect, authorize} from "../middleware/auth.js";

import advancedResults from "../middleware/advancedResults.js";

import Category from "../models/Category.js";


// import other route
import productRouter from './products';

// re-route into other routes
router.use('/:categoryId/products', productRouter);

router
    .route('/')
    .get(advancedResults(Category), getCategories)
    .post(protect, authorize('admin'), addCategory);

router
    .route('/:id')
    .get(getCategory)
    .put(protect, authorize('admin'), updateCategory)
    .delete(protect, authorize('admin'), deleteCategory);

export default router;