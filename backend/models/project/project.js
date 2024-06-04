const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const droneSchema = require('../drone/drone')
const userSchema = require('../user/user')
const projectSchema = new mongoose.Schema({
    drone: {
        type: Schema.Types.ObjectId,
        ref: 'droneSchema',
        required: true
    },
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'userSchema',
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