const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const partSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: true
    },
    specifications: {
        type: String
    },
    quantity: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

const part = mongoose.model('Part', partSchema);

module.exports = part;