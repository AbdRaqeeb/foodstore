import asyncHandler from 'express-async-handler';
import ErrorResponse from "../utils/errorResponse.js";
import Order from "../models/Order.js";
import paystack from "../utils/paystack.js";

/**
 * @desc    Get orders
 * @routes  GET /api/v1/orders
 * @access  Private
 **/
export const getOrders = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults);
});

/**
 * @desc    Get single order
 * @routes  GET /api/v1/orders/:id
 * @access  Private
 **/
export const getOrder = asyncHandler(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate('user orderItems.product', 'name email phone brand price');

    if (!order) {
        return next(
            new ErrorResponse(`Order with ID: ${req.params.id} not found`, 404)
        );
    }

    // make sure only and owner of order can access an order
    if (req.user.id !== order.user._id.toString() && req.user.role !== 'admin') {
        return next(
            new ErrorResponse(`Not authorized to retrieve details of this order`, 401)
        );
    }


    res.status(200).json({
        success: true,
        data: order
   });
});

/**
 * @desc    Get user orders
 * @routes  GET /api/v1/orders/user
 * @access  Private
 **/
export const myOrders = asyncHandler(async (req, res, next) => {
    const orders = await Order.find({user: req.user.id}).populate('orderItems.product', 'name brand price');

    res.status(200).json({
        success: true,
        count: orders.length,
        data: orders
    });
});

/**
 * @desc    Add Order
 * @routes  POST /api/v1/orders
 * @access  Private
 **/
export const addOrder = asyncHandler(async (req, res, next) => {
    const {orderItems} = req.body;

    if (orderItems && orderItems.length === 0) {
        return next(
            new ErrorResponse(`No order items. Please add order items.`, 404)
        );
    }

    req.body.user = req.user.id;

    const order = await Order.create(req.body);

    const details = await getDetails(order._id);

    res.status(201).json({
        success: true,
        data: details
    });
});

/**
 * @desc    Update order to delivered
 * @routes  POST /api/v1/orders/:id/deliver
 * @access  Private
 **/
export const updateOrderToDelivered = asyncHandler(async (req, res, next) => {
    let order = await Order.findById(req.params.id);

    if (!order) {
        return next(
            new ErrorResponse(`Order with ID ${req.params.id} not found`, 404)
        );
    }

    // update delivered
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    order.status = 'delivered';

    await order.save();

    const details = await getDetails(order._id);


    res.status(200).json({
        success: true,
        data: details
    });

});

/**
 * @desc    Update order to paid
 * @routes  PUT /api/v1/orders/:id/pay
 * @access  Private
 **/
export const updateOrderToPaid = asyncHandler(async (req, res, next) => {
    const {reference} = req.body;

    let order = await Order.findById(req.params.id);

    if (!order) {
        return next(
            new ErrorResponse(`Order with ID: ${req.params.id} not found`, 404)
        );
    }
    const response = await paystack.verifyTransaction({reference});

    const {status, message, data} = response.body;

    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
        status,
        message,
        data: {
            amount: data.amount,
            currency: data.currency,
            transaction_date: data.transaction_date,
            status: data.status,
            reference: data.reference,
            domain: data.domain,
            gateway_response: data.gateway_response,
            message: data.message,
            channel: data.channel,
            customer: {
                id: data.customer.id,
                customer_code: data.customer.customer_code,
                name: data.customer.name,
                email: data.customer.email
            },
            plan: data.plan,
            requested_amount: data.requested_amount
        }
    };

    await order.save();

    const details = await getDetails(order._id);

    res.status(200).json({
        success: true,
        data: details
    });
});

/**
 * @desc    Update order status
 * @routes  PUT /api/v1/orders/:id/status
 * @access  Private
 **/
export const updateOrderStatus = asyncHandler(async (req, res, next) => {
    const {status} = req.body;

    let order = await Order.findById(req.params.id);

    if (!order) {
        return next(
            new ErrorResponse(`Order with ID: ${req.params.id} not found`, 404)
        );
    }

    order = await Order.findByIdAndUpdate(req.params.id, {status}, {
        new: true,
        runValidators: false
    });

    await order.save();

    const details = await getDetails(order._id);

    res.status(200).json({
        success: true,
        data: details
    });
});

/**
 * @desc    Delete order
 * @routes  DELETE /api/v1/orders/:id
 * @access  Private
 **/
export const deleteOrder = asyncHandler(async (req, res,next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(
            new ErrorResponse(`Order with ID: ${req.params.id} not found`, 404)
        );
    }

    // make sure only admin and owner of order can access an order
    if (req.user.id !== order.user.toString() && req.user.role !== 'admin') {
        return next(
            new ErrorResponse(`Not authorized to delete this order`, 401)
        );
    }

    await order.remove();

    res.status(200).json({
        success: true,
        data: {}
    });
});

const getDetails = async (id) => {
    const details = await Order.findById(id).populate('user orderItems.product', 'name price brand email phone');

    return details;
};