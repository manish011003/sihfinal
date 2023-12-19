//userModels.js
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username:{
        type: String,
        required: [true,"please give the username"],

    },
    email:{
        type: String,
        required: [true,"please provide the email"],
        unique: [true, "Email address is already taken "]

    },
    password:{
        type: String,
        required: [true,"please add the user password"],

    },
},
{
    timestamps: true
  }
);
module.exports = mongoose.model("User" , userSchema);