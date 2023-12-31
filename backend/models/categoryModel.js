const mongoose = require("mongoose");

const Schema = mongoose.Schema
const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        default: null
    },

    user: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
});

const Category = mongoose.model('category', categorySchema);

module.exports = { Category };