const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const db = process.env.SECRET_MONGO_URI;
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const User = require('./models/User');
const events = require("events");

mongoose.set('strictQuery', true);
mongoose.connect(db).then(res => {
    console.log('Connected to DB');
})

const app = express();

const server = require('http').createServer(app)


const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, '/public');
app.use(express.static(static_path));
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());



app.get('/getAllUsers', async (req,res) => {
    await User.find().then(async (users) => {
        await res.setHeader('Access-Control-Allow-Origin', "*");
         res.send(users);
    })
})

app.post('/pushUser', async (req,res) => {
    const newUser = await new User({firstName: req.body.firstName, lastName: req.body.lastName, phoneNumber: req.body.phoneNumber, mail: req.body.mail, eventCount: 0, firstEventDate: 0}).save()
    await res.setHeader('Access-Control-Allow-Origin', "*");
    await res.send(newUser);
    console.log(newUser)
})

app.post('/pushEvent', async (req,res) => {
        console.log(req.body.currentUser.firstName)
    await User.findOneAndUpdate({
        firstName: req.body.currentUser.firstName,
        lastName: req.body.currentUser.lastName,
        phoneNumber: req.body.currentUser.phone,
        mail: req.body.currentUser.mail,
    }, {$inc: {eventCount: 1} ,$push:{events: req.body.event}}, {new: true}).then(async(user) => {
        await res.setHeader('Access-Control-Allow-Origin', "*");
        res.send(req.body.event);

    })

})
app.post('/getCurrentUserEvents',  async (req,res) => {
    await  User.findOne({firstName: req.body.firstName, lastName: req.body.lastName ,phoneNumber: req.body.phone, mail:req.body.mail})
        .then(async(user) => {
            await res.setHeader('Access-Control-Allow-Origin', "*");
            res.send(user)})
})


server.listen(port, () => {
    console.log(`server is running at ${port}`);
});