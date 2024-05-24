const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userVerificationSchema = new Schema({
    email: {
        type: String,
    },
    uniqueString: {
        type: String,
    },
    createdAt: {
        type: Date,
    },
    expiresAt: {
        type: Date,
    }
});

const userVerification = mongoose.model('UserVerification', userVerificationSchema);

module.exports = userVerification;