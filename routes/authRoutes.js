const express = require("express");
const { registerController, loginController, currentUserController } = require("../controllers/authController");
const authMiddelware = require("../middlewares/authMiddelware");

const router = express.Router();

//routes
// Register || POST
router.post('/register',registerController);

// Login || POST
router.post('/login',loginController);

// Current User || GET
router.get('/current-user',authMiddelware, currentUserController);

module.exports = router