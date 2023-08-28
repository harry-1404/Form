const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/form")

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/user");

app.post('/form', (req, res)=>{
    UserModel.create(req.body)
    .then(users=>res.json(users))
    .catch(err=> res.json(err))
})
app.listen(3001, ()=>{
    console.log("server is running");
})