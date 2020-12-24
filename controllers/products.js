import asyncHandler from 'express-async-handler';
import {uploadImages} from 'cloudinary-simple-upload';
import ErrorResponse from "../utils/errorResponse.js";
import Product from "../models/Product.js";
import Category from "../models/Category.js";
import folders from "../helpers/folders.js";

/**
 * @desc    Get products
 * @route   GET /api/v1/categories/:categoryId/products
 * @route   GET /api/v1/products
 * @access  Public
 **/
export const getProducts = asyncHandler(async (req, res, next) => {
    if (req.params.categoryId) {
        const products = await Product.find({category: req.params.categoryId}).populate('user category', 'name email phone');

        return res.status(200).json({
            success: true,
            count: products.length,
            data: products
        });
    } else {
        res.status(200).json(res.advancedResults);
    }
});

/**
 * @desc    Get top products
 * @route   GET /api/v1/products/top
 * @access  Public
 **/
export const getTopProducts = asyncHandler(async (req, res, next) => {
    const products = await Product.find({}).sort({ rating: -1 }).limit(10).populate('user category', 'name email phone');

    res.status(200).json({
        success: true,
        count: products.length,
        data: products
    });
});

/**
 * @desc    Get single product
 * @route   GET /api/v1/products/:id
 * @access  Public
 **/
export const getProduct = asyncHandler(async (req, res, next) => {
    const product = await Product.findById(req.params.id).populate('user category', 'name email phone');

    if (!product) {
        return next(
            new ErrorResponse(`Product with ID: ${req.params.id} not found`, 404)
        );
    }

    res.status(200).json({
        success: true,
        data: product
    });
});

/**
 * @desc    Add product
 * @route   POST /api/v1/categories/:categoryId/products
 * @access  Private
 **/
export const addProduct = asyncHandler(async (req, res, next) => {
    const category = await Category.findById(req.params.categoryId);

    if (!category) {
        return next(
            new ErrorResponse(`Category with ID: ${req.params.categoryId} not found`, 404)
        );
    }

    if (!req.files || (req.files).length < 2) {
        return next(
            new ErrorResponse(`Please upload product images. More than one (1).`, 400)
        );
    }

    const images = await uploadImages(req.files.images, folders.products, 'owner');

    req.body.category = req.params.categoryId;
    req.body.user = req.user.id;
    req.body.images = images;

    const product = await Product.create(req.body);

    const details = await getDetails(product._id);

    res.status(201).json({
        success: true,
        data: details
    });
});

/**
 * @desc    Update product
 * @route   PUT /api/v1/products/:id
 * @access  Private
 **/
export const updateProduct = asyncHandler(async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(
            new ErrorResponse(`Product with ID: ${req.params.id} not found`, 404)
        );
    }

    // check if image was uploaded and make sure it is 2 or more
    if (req.files && Object.values(req.files).length < 2) {
        return next(
            new ErrorResponse(`Please upload product images. More than one (1).`, 400)
        );
    }

    // upload image if image was uploaded
    const images = req.files ? await uploadImages(req.files.images, folders.products, 'owner') : product.images;

    req.body.images = images;

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: false
    });

    await product.save({validateBeforeSave: false});

    const details = await getDetails(product._id);

    res.status(200).json({
        success: true,
        data: details
    });
});

/**
 * @desc    Delete product
 * @route   DELETE /api/v1/products/:id
 * @access  Private
 **/
export const deleteProduct = asyncHandler(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(
            new ErrorResponse(`Product with ID: ${req.params.id} not found`, 404)
        );
    }

    await product.remove();

    res.status(200).json({
        success: true,
        data: {}
    });
});

const getDetails = async (id) => {
    const details = await Product.findById(id).populate('category user', 'name email phone');

    return details;
};