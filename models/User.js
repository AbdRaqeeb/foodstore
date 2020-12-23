import crypto from 'crypto';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import geocoder from "../utils/geocoder.js";

const UserSchema = new mongoose.Schema({
        username: {
            type: String,
            required: [true, 'Please add a unique username'],
            unique: true
        },
        name: {
            type: String,
            required: [true, 'Please add a name'],
            trim: true
        },
        email: {
            type: String,
            required: [true, 'Please add an email'],
            unique: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please add a valid email',
            ]
        },
        phone: {
            type: String,
            trim: true
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user'
        },
        password: {
            type: String,
            required: [true, 'Please add a password'],
            minlength: 6,
            select: false,
        },
        about: String,
        image: String,
        address: String,
        pick_up: String,
        resetPasswordToken: String,
        resetPasswordExpire: Date,
        confirmEmailToken: String,
        isEmailConfirmed: {
            type: Boolean,
            default: false,
        },
        location: {
            // GeoJSON Point
            type: {
                type: String,
                enum: ['Point']
            },
            coordinates: {
                type: [Number],
                index: '2dsphere'
            },
            formattedAddress: String,
            street: String,
            city: String,
            state: String,
            zipcode: String,
            country: String,
            countryCode: String
        },
        createdAt: {
            type: Date,
            default: Date.now,
        }
    },
    {
        toJSON: {virtuals: true},
        toObject: {virtuals: true}
    }
);



// Encrypt password before saving to database
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Sign jwt and returns
UserSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({
        id: this._id,
        email: this.email,
        role: this.role
    }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
};


// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Generate and hash password token
UserSchema.methods.getResetPasswordToken = function () {
    // generate token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash token and set to resetPasswordToken field
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    //set expire
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    return resetToken;
};

// Generate email confirm token
UserSchema.methods.generateEmailConfirmToken = function (next) {
    // email confirmation token
    const confirmationToken = crypto.randomBytes(20).toString('hex');

    // set confirmEmailToken
    this.confirmEmailToken = crypto.createHash('sha256').update(confirmationToken).digest('hex');

    const confirmTokenExtend = crypto.randomBytes(100).toString('hex');
    return `${confirmationToken}.${confirmTokenExtend}`;
};

// Geocode and set location field
// UserSchema.pre('save', async function (next) {
//     if (!this.isModified('address')) {
//         next();
//     }
//     if (this.address === null || this.address === undefined) {
//         next();
//     }
//     const loc = await geocoder.geocode(this.address);
//     if (loc.length === 0) {
//         next();
//     }
//     this.location = {
//         type: 'Point',
//         coordinates: [loc[0].longitude, loc[0].latitude],
//         formattedAddress: loc[0].formattedAddress,
//         street: loc[0].extra.neighborhood,
//         city: loc[0].administrativeLevels.level2long,
//         state: loc[0].administrativeLevels.level1long,
//         zipcode: loc[0].zipcode,
//         country: loc[0].country,
//         countryCode: loc[0].countryCode
//     };
//
// });


export default mongoose.model('User', UserSchema);