const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
    inventoryType: {
        type: String,
        required: [true, "Please provide an inventory type"],
        enum: ["in", "out"]
    },
    bloodGroup: {
        type: String,
        required: [true, "Please provide a blood group"],
        enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]
    },
    quantity: {
        type: Number,
        required: [true, "Please provide a quantity"]
    },
    email: {
        type: String,
        required: [true, "Please provide an email address"],
        // unique: true
    },
    organisation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true, "Please provide an organisation"]
    },
    hospital: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: function () {
            return this.inventoryType === "out";
        }
    },
    donar: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: function () {
            return this.inventoryType === "in";
        }
    },
    img : {
        type: String
    }
}, {timestamps: true});

module.exports = mongoose.model("inventory", inventorySchema)