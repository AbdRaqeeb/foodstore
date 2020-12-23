import mongoose from 'mongoose';
import slugify from 'slugify';

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a category name'],
        unique: true
    },
    slug: String,
    description: {
        type: String,
        required: [true, 'Please add category description'],
        maxlength: [200, 'Description can not be more than 200 characters']
    },
    numProducts: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true,
    toObject: {virtuals: true},
    toJSON: {virtuals: true}
});

// Reverse populate with virtuals
CategorySchema.virtual('products', {
    ref: 'Product',
    localField: '_id',
    foreignField: 'category',
    justOne: false
});

// Create category slug from the name
CategorySchema.pre('save', function(next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});

// cascade delete products when a category is deleted
CategorySchema.pre('remove', async function (next) {
    console.log(`Products being removed from category ${this._id}`);
    await this.model('Product').deleteMany({ category: this._id });
    next();
});

export default mongoose.model('Category', CategorySchema);


