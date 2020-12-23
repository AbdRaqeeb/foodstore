import express from 'express';
import {
    addReview,
    getReviews,
    getReview,
    updateReview,
    deleteReview
} from '../controllers/reviews.js';

const router = express.Router({mergeParams: true});
import Review from '../models/Review.js';

import advancedResults from '../middleware/advancedResults.js';
import {protect} from '../middleware/auth.js';

router
    .route('/')
    .get(advancedResults(Review, {
            path: 'product user',
            select: 'name email phone brand cost price rating discount'
        }),
        getReviews
    )
    .post(protect, addReview);

router
    .route('/:id')
    .get(getReview)
    .put(protect, updateReview)
    .delete(protect, deleteReview);

export default router;