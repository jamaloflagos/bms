const mongoose = require("mongoose");

const Schema = mongoose.Schema
const authorSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    gender: {
        type: String,
        required: true
    },

    dob: {
        type: String,
        default: null
    },

    yod: {
        type: String,
        default: null
    },

    position: {
        type: String,
        required: true
    },

    user: {
        type: String,
        required: true
    }

}, {
    timestamps: true,
    versionKey: false
});

const Author = mongoose.model('author', authorSchema);

module.exports = { Author }