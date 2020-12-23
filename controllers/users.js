import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import ErrorResponse from "../utils/errorResponse.js";

/**
 * @desc    Get users
 * @route   GET /api/v1/users
 * @access  private/admin
 * */
export const getUsers = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults);
});

/**
 * @desc    Get single user
 * @route   GET /api/v1/users/:id
 * @access  private/admin
 * */
export const getUser = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    res.status(200).json({
        success: true,
        data: user
    });
});

/**
 * @desc    Add  user
 * @route   GET /api/v1/users
 * @access  private/admin
 * */
export const createUser = asyncHandler(async (req, res, next) => {
    const user = await User.create(req.body);

    res.status(201).json({
        success: true,
        data: user
    });
});

/**
 * @desc    Update  user
 * @route   PUT /api/v1/users/:id
 * @access  private/admin
 * */
export const updateUser = asyncHandler(async (req, res, next) => {
    let user = await User.findById(req.params.id);

    if (!user) {
        return next(
            new ErrorResponse(`User with the ID: ${req.params.id} not found`, 404)
        );
    }

    user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: false
    });

    await user.save();
    res.status(200).json({
        success: true,
        data: user,
    });
});

/**
 * @desc    Delete  user
 * @route   DELETE /api/v1/users/:id
 * @access  private/admin
 * */
export const deleteUser = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(
            new ErrorResponse(`User with the ID ${req.params.id} not found`, 404)
        );
    }

    await user.remove();

    res.status(200).json({
        success: true,
        data: {}
    });
});