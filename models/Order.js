import mongoose from 'mongoose';
import cryptoRandomString from "crypto-random-string";

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'User',
    },
    reference: {
        type: String
    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'en-route', 'delivered'],
        required: true,
        default: 'pending'
    },
    orderItems: [
        {
            name: { type: String, required: true },
            qty: { type: Number, required: true },
            price: { type: Number, required: true },
            product: {
                type: mongoose.Schema.ObjectId,
                required: true,
                ref: 'Product',
            },
        }
    ],
    shippingAddress: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String },
        country: { type: String, required: true, default: 'Nigeria' },
    },
    paymentMethod: {
        type: String,
        enum: ['card', 'on-delivery'],
        required: true,
        default: 'card'
    },
    paymentResult: {
        status: {type: Boolean},
        message: {type: String},
        data: {
            amount: {type: String},
            currency: {type: String},
            transaction_date: {type: Date},
            status: {type: String},
            reference: {type: String},
            domain: {type: String},
            gateway_response: {type: String},
            message: {type: String},
            channel: {type: String},
            customer: {
                id: {type: Number},
                customer_code: {type: String},
                name: {type: String},
                email: {type: String}
            },
            plan: {type: String},
            requested_amount: {type: Number}
        }
    },
    shippingPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },
    itemsPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false,
    },
    paidAt: {
        type: Date,
    },
    isDelivered: {
        type: Boolean,
        required: true,
        default: false,
    },
    deliveredAt: {
        type: Date,
    }
}, {
    timestamps: true
});

OrderSchema.pre('save', function (next) {
    this.reference = cryptoRandomString({length: 15, type: 'distinguishable'});
    next();
});


export default mongoose.model('Order', OrderSchema);