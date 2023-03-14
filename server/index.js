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
const {checkingEventDate} = require("./checkingEventDate");
const {validateSession} = require('./validateSession')
const {getAllUsers} = require("./getAllUsers");
const {pushUser} = require("./pushUser");
const {getCurrentUserEvents} = require("./getCurrentUserEvents");
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



app.get('/getAllUsers', validateSession, getAllUsers)
app.post('/pushUser', pushUser)
app.post('/pushEvent',  checkingEventDate);
app.post('/getCurrentUserEvents',  getCurrentUserEvents)


server.listen(port, () => {
    console.log(`server is running at ${port}`);
});