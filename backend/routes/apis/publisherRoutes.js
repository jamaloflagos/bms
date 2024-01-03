const express = require("express");
const router = express.Router();
const {createPublisher, getAllPublishers, getSinglePublisher, deletePublisher, updatePublisher, getPublishersName} = require("../../controllers/publisherControllers");
const { verifyJWT } = require("../../middlewares/verifyJWT");

router.use(verifyJWT);

router.route("/")
    .get(getAllPublishers)
    .post(createPublisher)

router.route("/names")
    .get(getPublishersName)

router.route("/:id")
    .get(getSinglePublisher)
    .patch(updatePublisher)
    .delete(deletePublisher)
    
module.exports = router