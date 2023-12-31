const express = require("express");
const { verifyJWT } = require("../middlewares/verifyJWT");
const { author } = require("../middlewares/author");
const { category } = require("../middlewares/category");
const { publisher } = require("../middlewares/publisher");
const { getAllBookController, getSingleBookController, saveBookController, editBookController, deleteBookController, searchBookController } = require("../controllers/bookController")
const router = express.Router();

router.use(verifyJWT);


router.route("/")
    .get(getAllBookController) // get all books

router.route("/search")
    .get(searchBookController) // search books

router.route("/:id")
    .get(getSingleBookController) //get single book

router.route("/:id")
    .patch(editBookController) // edit book

router.route("/:id")
    .delete(deleteBookController) // delete book

router.route("/add")
    .post(author, publisher, category, saveBookController); //create book

// get all books
// bookRouter.get("/", getAllBookController);

// search Book 
// bookRouter.get("/search", searchBookController);

// get single Book
// bookRouter.get("/:_id", getSingleBookController);

// edit Book
// bookRouter.patch("/:id", editBookController);

// delete Book 
// bookRouter.delete("/:id", deleteBookController);


//middlewares
// bookRouter.use(book);
// bookRouter.use(author);
// bookRouter.use(publisher);
// bookRouter.use(category);
// bookRouter.use(comment);

// save Book
// bookRouter.post("/add", saveBookController);

module.exports = router