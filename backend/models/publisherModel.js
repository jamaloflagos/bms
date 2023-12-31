const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const publisherSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    address: {
        type: String,
        default: null
    },

    country: {
        type: String,
        required: true
    },

    email: {
        type: String,
        default: null
    },

    phone: {
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

const Publisher = mongoose.model('publisher', publisherSchema);

module.exports = { Publisher };