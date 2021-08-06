'use strict'
const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');

const mongoDb = "mongodb+srv://chava:any'spizza@cluster0.twzfv.mongodb.net/cookie_monster?retryWrites=true&w=majority"
mongoose.connect(mongoDb, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
var db = mongoose.connection;
db.on('connected', function () { console.log("connected to db") });
db.on('error', function () { console.log("error") });
db.on('disconnected', function () { console.log("disconnected to db") });
const Schema = mongoose.Schema;

const item = new Schema(
    {
        id: { type: Number, required: true },
        image: { type: String },
        name: { type: String },
        category: { type: String },
        price: { type: String },
    }
);
var items = mongoose.model('items', item, "Items");

router.post("/insertProducts", (req, res) => {
    items.insertMany(req.body.items).then(function () {
        console.log("Data inserted");
        res.send("Data inserted")  // Success
    }).catch(function (error) {
        console.log(error)         // Failure
    });

});

router.get('/all', async (req, res) => {
    await items.find({}, (err, products) => {
        if (err) {
            return res.status(422).send(err)
        }
        if (!products) {
            return res.status(422).send({ error: "No data in the collection" })
        }
        res.send(products)
    })
});

router.get('/category', async (req, res) => {
    await items.find({ category: req.query.category }, (err, products) => {
        if (err) {
            return res.status(422).send(err)
        }
        if (!products) {
            return res.status(422).send({ error: "No data in the collection" })
        }
        res.send(products)
    })
})
module.exports = router;

