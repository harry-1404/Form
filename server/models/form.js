const mongoose = require("mongoose");

const FormSchema = new mongoose.Schema({
    fname:String,
    lname:String,
    email:String,
    phone:Number,
    address:String,
    address2:String,
    state:String,
    country:String,
    zc:Number,
})

const UserModel = mongoose.model("users", FormSchema);
module.exports = UserModel;