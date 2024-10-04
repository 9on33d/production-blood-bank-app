const userModel = require("../models/userModel")

// get Donars List
const getDonarsListController = async (req, res) => {

try {
    const donarData = await userModel
    .find({role:'donar'})
    .sort({createdAt: -1})
    return res.status(200).send({
        success: true,
        Totalcount: donarData.length,
        message: "Donars List Fetched Successfully",
        donarData
    })
} catch (error) {
    console.log(error)
    return res.status(500).send({
        success: false,
        message: "Error In Get Donars List",
        error
    })
}

}
// get Hospital List
const getHospitalListController = async (req, res) => {

try {
    const hospitalData = await userModel
    .find({role:'hospital'})
    .sort({createdAt: -1})
    return res.status(200).send({
        success: true,
        Totalcount: hospitalData.length,
        message: "Hospital List Fetched Successfully",
        hospitalData
    })
} catch (error) {
    console.log(error)
    return res.status(500).send({
        success: false,
        message: "Error In Get Hospital List",
        error
    })
}

}
// get ORG List
const getOrgListController = async (req, res) => {

try {
    const orgData = await userModel
    .find({role:'organisation'})
    .sort({createdAt: -1})
    return res.status(200).send({
        success: true,
        Totalcount: orgData.length,
        message: "ORG List Fetched Successfully",
        orgData
    })
} catch (error) {
    console.log(error)
    return res.status(500).send({
        success: false,
        message: "Error In Get ORG List",
        error
    })
}
};

// delete Donar
const deleteDonarController = async (req, res) => {
    try {
        await userModel.findByIdAndDelete(req.params.id)
        return res.status(200).send({
            success: true,
            message: "Donar Deleted Successfully"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error In Delete Donar",
            error
        })
    }
}
// delete Hospital
const deleteHospitalController = async (req, res) => {
    try {
        await userModel.findByIdAndDelete(req.params.id)
        return res.status(200).send({
            success: true,
            message: "Hospital Deleted Successfully"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error In Delete Hospital",
            error
        })
    }
}
// delete Org
const deleteOrgController = async (req, res) => {
    try {
        await userModel.findByIdAndDelete(req.params.id)
        return res.status(200).send({
            success: true,
            message: "ORG Deleted Successfully"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error In Delete ORG",
            error
        })
    }
}
// export

module.exports = { 
    getDonarsListController, 
    getHospitalListController,
    getOrgListController,
    deleteDonarController,
    deleteHospitalController,
    deleteOrgController
}