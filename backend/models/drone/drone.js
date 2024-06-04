const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Part = require('../part/part')
const droneSchema = new Schema({
    model: {
        type: String,
        required: true,
        unique: true
    },
    manufacturer: {
        type: String,
        required: true
    },
    compatibleType: [{
        type: {
            type: String,
            required: true
        },

        amountNeeded: {
            type: Number,
            required: true
        }
    }],
    compatibleParts: [{
            type: Schema.Types.ObjectId,
            ref: 'Part',
            required: true

    }],
    quantity:{
        type: Number,
        required: true
    },
    testList: [String]

}, {
    timestamps: true
});

const drone = mongoose.model('Drone', droneSchema);

module.exports = drone;