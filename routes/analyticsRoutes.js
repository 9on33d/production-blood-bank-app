const express = require("express");
const authMiddelware = require("../middlewares/authMiddelware");
const { bloodGroupDetailsController } = require("../controllers/analyticsController");


const router = express.Router();

// routes


//get all Blood data || GET
router.get("/bloodGroups-data", authMiddelware, bloodGroupDetailsController);



module.exports = router