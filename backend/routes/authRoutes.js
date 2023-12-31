const express = require("express");
const { login,  refreshToken, logout } = require("../controllers/authController");
const router = express.Router();

// router.post('/signup', signupController);
router.route("/login")
    .post(login);

router.route("/refresh")
    .get(refreshToken);

router.route("/logout")
    .post(logout)

module.exports = router
