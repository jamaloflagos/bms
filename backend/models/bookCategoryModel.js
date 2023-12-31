const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const bookCategorySchema = new Schema({
    book_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "book",
        required: true
    },

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
        required: true
    }
});

const BookCategory = mongoose.model('book-category', bookCategorySchema);

module.exports= { BookCategory }