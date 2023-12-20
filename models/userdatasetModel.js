//userModels.js
const mongoose = require("mongoose");

const dataSchema = mongoose.Schema({
    username:{
        type: String,
    },
    device_sold:{
        type: String,
    },
    points_earned:{
        type: String,
    },
},
{
    timestamps: true
  }
);
module.exports = mongoose.model("User" , dataSchema);