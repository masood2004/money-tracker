const express = require("express");
const cors = require("cors");
const Transaction = require("./models/Transaction");
const { default: mongoose } = require("mongoose");
const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.get("/api/test", function(req, res){
    res.json("test ok2");
});

app.post("/api/transaction", async function(req, res){
    await mongoose.connect(process.env.MONGO_URL);
    const {name, description, datetime, price} = req.body;
    const transaction = await Transaction.create({name, description, datetime, price})
    res.json(transaction);
})

app.get("/api/transactions", async function (req, res){
    await mongoose.connect(process.env.MONGO_URL);
    const transactions = await Transaction.find();
    res.json(transactions);
})

app.listen(4000);
