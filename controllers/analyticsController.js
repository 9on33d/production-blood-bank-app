// Get Blood Data

const inventoryModel = require("../models/inventoryModel");
const mongoose = require("mongoose");

const bloodGroupDetailsController = async (req, res) => {
    try {
        const bloodGroups = ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"];
        const bloodGroupData = [];
        const organisation = new mongoose.Types.ObjectId(req.body.userId);
        
        // Get blood group data using Promise.all
        await Promise.all(bloodGroups.map(async (bloodGroup) => {
            // Count total in
            const totalIn = await inventoryModel.aggregate([
                {
                    $match: {
                        organisation,
                        bloodGroup: bloodGroup,
                        inventoryType: "in",
                    },
                },
                {
                    $group: {
                        _id: null,
                        total: { $sum: "$quantity" },
                    },
                },
            ]);
            
            const totalOut = await inventoryModel.aggregate([
                {
                    $match: {
                        organisation,
                        bloodGroup: bloodGroup,
                        inventoryType: "out",
                    },
                },
                {
                    $group: {
                        _id: null,
                        total: { $sum: "$quantity" },
                    },
                },
            ]);
            
            // Calculate available blood
            const availableBlood = (totalIn[0]?.total || 0) - (totalOut[0]?.total || 0);

            // Push data
            bloodGroupData.push({
                bloodGroup,
                totalIn: totalIn[0]?.total || 0,
                totalOut: totalOut[0]?.total || 0,
                availableBlood,
            });
        }));

        return res.status(200).send({
            success: true,
            message: "Blood Group Details",
            bloodGroupData,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error In Blood Group Details",
            error: error.message,
        });
    }
};

module.exports = { bloodGroupDetailsController };
