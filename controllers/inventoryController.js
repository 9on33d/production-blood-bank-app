const mongoose = require("mongoose");
const userModel = require("../models/userModel");
const inventoryModel = require("../models/inventoryModel");



// Create Inventory
const createInventoryController = async (req, res) => {
    try {
        const {email, inventoryType} = req.body;
        // Validation
        const user = await userModel.findOne({email})
        if(!user) {
             return res.status(404).send({
                success: false,
                message: "User Not Found"
            })
        }
        if(inventoryType === "in" && user.role !== "donar") {
             return res.status(404).send({
                success: false,
                message: "Only Doner Can Add Blood"
             })
        }
        if(inventoryType === "out" && user.role !== "hospital") {
             return res.status(404).send({
                success: false,
                message: "Only Hospital Can Remove Blood"
             })
        }

        if(req.body.inventoryType === 'out'){
            const requestedBloodGroup = req.body.bloodGroup
            const requestedQuantityOfBlood = req.body.quantity
            const organisation = new mongoose.Types.ObjectId(req.body.userId)

            // calculate blood quantity
            const totalInOfRequestedBlood = await inventoryModel.aggregate([
                {$match:{
                    organisation,
                    inventoryType: "in",
                    bloodGroup: requestedBloodGroup
                }},{
                    $group:{
                        _id: "$bloodGroup",
                        total: {$sum: "$quantity"}
                    }
                }
            ])
            // console.log('Total In', totalInOfRequestedBlood)
            const totalIn = totalInOfRequestedBlood[0]?.total || 0

            // calculate out blood quantity
            const totalOutOfRequestedBlood = await inventoryModel.aggregate([
                {$match:{
                    organisation,
                    inventoryType: "out",
                    bloodGroup: requestedBloodGroup
                }},{
                    $group:{
                        _id: "$bloodGroup",
                        total: {$sum: "$quantity"}
                    }
                }
            ])
            // console.log('Total Out', totalOutOfRequestedBlood)

            const totalOut = totalOutOfRequestedBlood[0]?.total || 0
            // in and out
            const availableQuantityOfBloodGroup = totalIn - totalOut
            // check if enough blood
            if(availableQuantityOfBloodGroup < requestedQuantityOfBlood) {
                return res.status(500).send({
                    success: false,
                    message: `Only ${availableQuantityOfBloodGroup}ML of ${requestedBloodGroup.toUpperCase()} is available`
                })
            }
            req.body.hospital = user?._id
        }
        else{
            req.body.donar = user?._id
        }

        // save record
        const inventory = new inventoryModel(req.body)
        await inventory.save()
        return res.status(201).send({ 
            success: true, 
            message: "Inventory Created Successfully", 
            inventory 
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({ 
            success: false, 
            message: "Error In Create Inventory", 
            error 
        });
    }
};


// Get Inventory
const getInventoryController = async (req, res) => {
    try {
        const inventory = await inventoryModel.find({organisation: req.body.userId})
        .populate("donar")
        .populate("hospital")
        .sort({
            createdAt: -1
        });
        return res.status(200).send({ 
            success: true, 
            message: "Inventory Fetched Successfully", 
            inventory 
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ 
            success: false, 
            message: "Error In Get Inventory", 
            error 
        });
    }
};
// Get Hospital records
const getInventoryHospitalController = async (req, res) => {
    try {
        const inventory = await inventoryModel.find(req.body.filters)
        .populate("donar")
        .populate("hospital")
        .populate("organisation")
        .sort({
            createdAt: -1
        });
        return res.status(200).send({ 
            success: true, 
            message: "get hospital consumer Fetched Successfully", 
            inventory 
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ 
            success: false, 
            message: "Error In Get consumer Inventory", 
            error 
        });
    }
};


// GET DONAR INVENTORY 3
const getRecentInventoryController = async (req, res) => {
    try {
        const inventory = await inventoryModel.find({organisation: req.body.userId}).limit(3).sort({createdAt: -1})
        return res.status(200).send({
            success: true,
            message: "Recent Inventory Fetched Successfully",
            inventory
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Error In Get Recent Inventory",
            error
        })
    }
}

// GET DONAR INVENTORY

const getDonersController = async (req, res) => {
    try {
        const organisation = req.body.userId
        // find doners
        const donerId = await inventoryModel.distinct("donar", { organisation 
        });
        // console.log(donerId);
        const donars = await userModel.find({ _id: { $in: donerId } });

        return res.status(200).send({
            success: true,
            message: "Doners Fetched Successfully",
            donars,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error In Get Doners",
            error
        })
    }
};

const getHospitalsController = async (req, res) => {
    try {
        const organisation = req.body.userId
        // get hospitals
        const hospitalId = await inventoryModel.distinct("hospital", { organisation
        })
        // find hospitals
        const hospitals = await userModel.find({
            role: "hospital"
        })
        return res.status(200).send({
            success: true,
            message: "Hospitals Fetched Successfully",
            hospitals,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error In Get Hospital",
            error
        })
    }
}

// GET ORG Profiles
const getOrganisationController = async (req, res) => {
    try {
        const donar = req.body.userId
        const orgId = await inventoryModel.distinct("organisation", { donar 
        });
        // find org
        const organisations = await userModel.find({ _id: { $in: orgId } });

        return res.status(200).send({
            success: true,
            message: "Organisations Fetched Successfully",
            organisations,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error In Get Organisation",
            error
        })
    }
}
// GET ORG for hospital Profiles
const getOrganisationForHospitalController = async (req, res) => {
    try {
        const hospital = req.body.userId
        const orgId = await inventoryModel.distinct("organisation", { hospital 
        });
        // find org
        const organisations = await userModel.find({ _id: { $in: orgId } });

        return res.status(200).send({
            success: true,
            message: "HospitalOrganisations Fetched Successfully",
            organisations,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error In Get Hospital Organisation",
            error
        })
    }
}

// picture upload


module.exports = { 
    createInventoryController,
    getInventoryController,
    getDonersController,
    getHospitalsController,
    getOrganisationController,
    getOrganisationForHospitalController,
    getInventoryHospitalController,
    getRecentInventoryController,

}
