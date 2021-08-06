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
const country = new Schema(
    {
        name: { type: String },
    }
);

var countries = mongoose.model('countries', country, "Countries");

router.post('/', async (req, res) => {
    let index = 0;
    [
        "Afghanistan"
        ].forEach(countr=>{
            new countries({name:countr}).save((err,doc)=>{
                if (err) return console.error(err);
                console.log("doc inserted successfully!");
            })
            index++;
        })
        res.send("inserted successfully")
});


router.get('/all', async (req, res) => {
    await countries.find({}, (err, countries) => {
        if (err) {
            return res.status(422).send(err)
        }
        if (!countries) {
            return res.status(422).send({ error: "No data in the collection" })
        }
        res.send(countries)
    })
});



module.exports = router;