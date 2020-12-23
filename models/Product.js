import mongoose from 'mongoose';
import slugify from 'slugify';

const ProductSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'User',
    },
    category: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'Category',
    },
    name: {
        type: String,
        required: [true, 'Please add product name'],
    },
    slug: String,
    images: {
        type: [String],
        required: [true, 'Please add product images']
    },
    brand: {
        type: String,
        required: [true, 'Please add product brand'],
    },
    description: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        default: 0
    },
    numReviews: {
        type: Number,
        required: true,
        default: 0
    },
    price: {
        type: Number,
        required: [true, 'Please add product price']
    },
    cost: {
        type: Number,
        required: [true, 'Please add product cost']
    },
    discount: {
        type: Number
    },
    countInStock: {
        type: Number,
        required: true,
        default: 0,
    }
}, {
    timestamps: true
});

// calculate discount percentage before saving
ProductSchema.pre('save', function (next) {
    this.discount = (100 * (this.cost - this.price)) / this.cost;
    next()
});

// Create product slug from the name
ProductSchema.pre('save', function(next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});

// product statics to get number of products
ProductSchema.statics.getNumProducts =  async function(categoryId) {
    const count = await this.model('Product').countDocuments({category: categoryId});

    try {
        await this.model('Category').findByIdAndUpdate(categoryId, {
            numProducts: count
        });
    } catch (e) {
        console.error(e);
    }
};

// update category numProduct
ProductSchema.post('save', async function () {
    await this.constructor.getNumProducts(this.category);
});

export default mongoose.model('Product', ProductSchema);