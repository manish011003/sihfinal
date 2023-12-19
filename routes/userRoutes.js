const express = require("express");
const { registerUser, loginUser, currentUser } = require("../controllers/userController");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/current", currentUser); // Change POST to GET for current user

module.exports = router;
