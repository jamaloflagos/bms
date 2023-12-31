const mongoose = require("mongoose");

const Schema = mongoose.Schema

const bookSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    nickname: {
        type: String,
        default: null
    },

    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "author",
        required: true
    },

    publisher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "publisher",
        required: true
    },

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
        required: true
    },

    status: {
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
})

const Book = mongoose.model("books", bookSchema)

module.exports = {Book}