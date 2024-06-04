const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Drone = require('../drone/drone')
const User = require('../user/user')
const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    drone: {
        type: Schema.Types.ObjectId,
        ref: 'Drone',
        required: true
    },
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    finished:{
        type: Boolean,
        required: true
    }

}, {
    timestamps: true
});

const project = mongoose.model('Project', projectSchema);

module.exports = project;