import express from 'express';
import {
    getOrder,
    getOrders,
    addOrder,
    updateOrderStatus,
    updateOrderToDelivered,
    updateOrderToPaid,
    myOrders,
    deleteOrder
} from '../controllers/orders.js';

const router = express.Router();

import {protect, authorize} from "../middleware/auth.js";

import Order from "../models/Order.js";

import advancedResults from "../middleware/advancedResults.js";

router.route('/user').get(protect, myOrders);

router
    .route('/')
    .get(protect, authorize('admin'), advancedResults(Order, {
        path: 'user orderItems.product',
        select: 'name email phone price brand'
    }), getOrders)
    .post(protect, addOrder);

router
    .route('/:id')
    .get(protect, getOrder)
    .delete(protect, deleteOrder);


router.route('/:id/pay').put(updateOrderToPaid);

router.route('/:id/deliver').put(protect, authorize('admin'), updateOrderToDelivered);

router.route('/:id/status').put(protect, authorize('admin'), updateOrderStatus);

export default router;

