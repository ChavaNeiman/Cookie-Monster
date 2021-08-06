var router = require('express')();
var BodyParser = require('body-parser');
var mongoose = require('mongoose');

router.use(BodyParser.urlencoded({ extended: false }))
router.use(BodyParser.json());
const { email } = require('./sendEmail');
const { validateBodyForEmail,validateForm,userExists } = require('./validations');

const mongoDb = "mongodb+srv://chava:any'spizza@cluster0.twzfv.mongodb.net/cookie_monster?retryWrites=true&w=majority"
mongoose.createConnection(mongoDb, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const Schema = mongoose.Schema;
const userSchema = new Schema(
    {
        name: { type: String, required: true},
        id: { type: String, required: true },
        email: { type: String, required: true, unique:true },
        password: { type: String, required: true },
        confirmPassword: { type: String, required: true },
        cart: { type: Object },
        PaymentShipping: { type: Object, default: {} },
        orders: { type: Array }
    }, { minimize: false }
);

var user = mongoose.model('users', userSchema, "Users");

router.get('/users', async (req, res) => {
    await user.findOne({ email: req.query.email }, (err, user) => {
        if (err) {
            return res.status(422).send(err)
        }
        if (!user) {
            return res.send([])
        }
        res.send(user)
    })
});


router.get('/all', async (req, res) => {
    await user.find({}, (err, products) => {
        if (err) {
            return res.status(422).send(err)
        }
        if (!products) {
            return res.status(422).send({ error: "No data in the collection" })
        }
        res.send(products)
    })
});

router.post('/addUser', async (req, res) => {
    let errors = validateForm(req.body);
    let hasNoErrors = true;
    Object.keys(errors).forEach(field => {
        hasNoErrors &= errors[field] === "" ? true : false;
    })
    let userExist = await userExists(req.body, user);
    if (hasNoErrors && !userExist) {
        user(req.body).save(function (err, doc) {
            if (err) return console.error(err);
            console.log("user inserted successfully!");
        })
        email(req.body.email, "Welcome to Cookie Monster", `<br/><h3>Hi ${req.body.name} <h3/><br/>Welcome to Cookie Monster club <br/>Glad to have you with us! <br/><br/><b>Cookie Monster<b/><br/><img style="width:150px;" src='cid:unique@kreata.ee'><br/>`);
    }
})

router.put('/update', async (req, res) => {
    const doc = await user.findOneAndUpdate({ id: req.query.id }, req.body);
    res.send(doc);
});

router.put('/delete', async (req, res) => {
    await user.deleteOne({ id: req.query.id }, (err, products) => {
        if (err) {
            return res.status(422).send(err)
        }
        if (!products) {
            return res.status(422).send({ error: "No data in the collection" })
        }
        res.send(products)
    })
});

router.post('/confirmOrder', async (req, res) => {
    let errors = validateBodyForEmail(req.body);
    let hasNoErrors = true;
    Object.keys(errors).forEach(field => {
        hasNoErrors &= errors[field] === "" ? true : false;
    })
    let userExist = await userExists(req.body, user);
    if (hasNoErrors && userExist) {
        email(req.body.email, "Confirming you order", `<h2>Order Confirmation<h2/> 
        ${req.body.name}, thank you for you order.<br/>
        <br/><b>Order date:<b/> ${req.body.date}
        <br/><br/><b>Order summary:<b/><br/>
        ${req.body.order}
        <br/><b>Order total:<b/> \$${req.body.total}<br/><br/><b>Cookie Monster<b/><br/><img style="width:150px;" src='cid:unique@kreata.ee'>`);
        res.send("ok");
    }
});


module.exports = router;