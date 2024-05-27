const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const partSchema = require('../peca/peca')
const droneSchema = new Schema({
    model: {
        type: String,
        required: true
    },
    manufacturer: {
        type: String,
        required: true
    },
    parts: [{
        part: {
            type: Schema.Types.ObjectId,
            ref: 'Part',
            required: true },

        amountNeeded: {
            type: Number,
            required: true }
    }],
    testList: [String]

}, {
    timestamps: true
});

const drone = mongoose.model('Drone', droneSchema);

module.exports = drone;