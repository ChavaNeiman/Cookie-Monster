var router = require('express')();
var BodyParser = require('body-parser');
var mongoose = require('mongoose');

router.use(BodyParser.urlencoded({ extended: false }))
router.use(BodyParser.json());


const mongoDb = "mongodb+srv://chava:any'spizza@cluster0.twzfv.mongodb.net/cookie_monster?retryWrites=true&w=majority"
mongoose.createConnection(mongoDb, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const Schema = mongoose.Schema;

const faq = new Schema(
    {
        id: { type: Number },
        title: { type: String },
        content: { type: String }
    }
);

var faqs = mongoose.model('faq', faq, "Faq");

router.get('/', async (req, res) => {
    console.log("hi");
    await faqs.find({}, (err, products) => {
        if (err) {
            return res.status(422).send(err)
        }
        if (!products) {
            return res.status(422).send({ error: "No data in the collection" })
        }
        res.send(products)
    })
});

router.post("/addQuestion", async(req, res) => {
    faqs(req.body).save((err, docs)=> {
        if (err) return console.error(err);
        console.log("Data inserted");
        res.send("Data inserted")
    })
});

module.exports = router;