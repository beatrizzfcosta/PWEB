const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: [true, 'Sorry, this username is already in use.']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'Sorry, this email address is already in use.']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    verification: {
        type: Boolean,
    },
    image: {
        type: String,
        required: false,
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;
