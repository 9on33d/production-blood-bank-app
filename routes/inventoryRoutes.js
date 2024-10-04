const express = require("express");
const authMiddelware = require("../middlewares/authMiddelware");
const { createInventoryController, 
    getInventoryController, 
    getDonersController,
    getHospitalsController, 
    getOrganisationController,
    getOrganisationForHospitalController,
    getInventoryHospitalController,
    getRecentInventoryController,
} = require("../controllers/inventoryController");





const router = express.Router();

// routes
//ADD INVENTORY || POST
router.post("/create-inventory", authMiddelware, createInventoryController);

//get all inventory || GET
router.get("/get-inventory", authMiddelware, getInventoryController);

//get recent inventory || GET
router.get("/get-recent-inventory", authMiddelware, getRecentInventoryController);

//get hospital inventory || GET
router.post("/get-inventory-hospital", authMiddelware, getInventoryHospitalController);

//get all doner || GET
router.get("/get-donars", authMiddelware, getDonersController);

//get all Hospitals || GET
router.get("/get-hospitals", authMiddelware, getHospitalsController);

//get all Organisations || GET
router.get("/get-organisation", authMiddelware, getOrganisationController);

//get all Organisations || GET
router.get("/get-organisation-for-hospital", authMiddelware, getOrganisationForHospitalController);




module.exports = router