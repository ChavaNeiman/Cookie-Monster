const app = require('express')();
const BodyParser = require('body-parser');
const cors = require('cors');

app.use(BodyParser.urlencoded({ extended: false }))
app.use(BodyParser.json());

const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
    optionSuccessStatus: 200,
}
app.use(cors(corsOptions));

app.get("/", (req, res) => {
    res.send("Welcome!");
})

app.use('/users', require('./users'));
app.use('/items', require('./items'));
app.use('/videos',require('./videos'));
app.use('/faq',require('./faq'));
app.use('/countries',require('./countries'));

app.listen(5000, () => {
    console.log("server is running...");
});