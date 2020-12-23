import express from 'express';
import {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
} from '../controllers/users.js';

import User from '../models/User.js';

const router = express.Router({ mergeParams: true });

import advancedResults from '../middleware/advancedResults.js';
import { protect, authorize } from '../middleware/auth.js';

router
    .route('/')
    .get(protect, authorize('admin'), advancedResults(User), getUsers)
    .post(protect, authorize('admin'), createUser);

router
    .route('/:id')
    .get(protect, getUser)
    .put(protect, authorize('admin'), updateUser)
    .delete(protect, authorize('admin'), deleteUser);

export default router;