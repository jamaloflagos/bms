const express = require("express");
const { verifyJWT } = require("../../middlewares/verifyJWT");
const { getAllBooks, getSingleBook, createBook, updateBook, deleteBook } = require("../../controllers/bookController")
const router = express.Router();

router.use(verifyJWT);

router.route("/")
    .get(getAllBooks) // get all books
    .post(createBook) //create book

router.route("/:id")
    .get(getSingleBook) //get single book
    .patch(updateBook) // edit book
    .delete(deleteBook) // delete book

module.exports = router