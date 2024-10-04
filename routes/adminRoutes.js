const express = require("express");
const authMiddelware = require("../middlewares/authMiddelware");
const { getDonarsListController, 
    getHospitalListController, 
    getOrgListController, 
    deleteDonarController,
    deleteHospitalController,
    deleteOrgController} = require("../controllers/adminController");
const adminMiddleware = require("../middlewares/adminMiddleware");

// router Object
const router = express.Router();

// Routes

// GET || DONAR LIST
router.get("/donar-list", 
    authMiddelware,
    adminMiddleware, 
    getDonarsListController
);
// GET || HOSPITAL LIST
router.get("/hospital-list", 
    authMiddelware,
    adminMiddleware, 
    getHospitalListController
);
// GET || ORG LIST
router.get("/org-list", 
    authMiddelware,
    adminMiddleware, 
    getOrgListController
);

// delete Donar
router.delete("/delete-donar/:id", 
    authMiddelware,
    adminMiddleware,
    deleteDonarController,
)
// delete hospital
router.delete("/delete-hospital/:id", 
    authMiddelware,
    adminMiddleware,
    deleteHospitalController,
)
// delete org
router.delete("/delete-org/:id", 
    authMiddelware,
    adminMiddleware,
    deleteOrgController,
)

// Export

module.exports = router