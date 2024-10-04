const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    role: {
        type: String,
        required: [true, "Please provide a role"],
        enum: ["admin", "organisation","donar","hospital"]
    },
    name: {
        type: String,
        required: function () {
            if(this.role === "user" || this.role === "admin"){
                return true;
            }
            return false;
        }
    },
    organisationName: {
        type: String,
        required: function () {
            if(this.role === "organization"){
                return true;
            }
            return false;
        }
    },
    hospitalName: {
        type: String,
        required: function () {
            if(this.role === "hospital"){
                return true;
            }
            return false;
        }
    },
    email: {
        type: String,
        required: [true, "Please provide an email address"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please provide a password"]
    },
    website: {
        type: String
    },
    address: {
        type: String,
        required: [true, "Please provide an address"]
    },
    phone: {
        type: String,
        required: [true, "Please provide a phone number"]
    }
}, {timestamps: true});

module.exports = mongoose.model("users", userSchema);