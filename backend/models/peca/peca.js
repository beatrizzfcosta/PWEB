const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const partSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true },
    type: {
        type: String,
        required: true },
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

const peca = mongoose.model('Peca', partSchema);

module.exports = peca;