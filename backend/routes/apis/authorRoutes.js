const express = require("express");
const router = express.Router();
const {createAuthor, getAllAuthors, getSingleAuthor, deleteAuthor, updateAuthor, getAuthorsName} = require("../../controllers/authorController");
const { verifyJWT } = require("../../middlewares/verifyJWT");

router.use(verifyJWT)

router.route("/")
    .get(getAllAuthors)
    .post(createAuthor)

router.route("/names")
    .get(getAuthorsName)

router.route("/:id")
    .get(getSingleAuthor)
    .patch(updateAuthor)
    .delete(deleteAuthor)

module.exports = router