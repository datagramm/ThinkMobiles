const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const db = process.env.SECRET_MONGO_URI;
const cors = require('cors');
const {corsOption} = require('../server/corsOption')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const {checkingEventDate} = require("./checkingEventDate");
const {validateSession} = require('./validateSession')
const {getAllUsers} = require("./getAllUsers");
const {pushUser} = require("./pushUser");
const {getCurrentUserEvents} = require("./getCurrentUserEvents");
const userAuthoRoutes = require('./routers/userAuthoRoutes')
const {logout} = require("./logout");

mongoose.set('strictQuery', true);
mongoose.connect(db).then(() => {
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
app.use(cors(corsOption))
app.use('/authorization', userAuthoRoutes)


app.get('/getAllUsers', validateSession, getAllUsers)
app.get('/logout', logout)
app.post('/pushUser', validateSession, pushUser)
app.post('/pushEvent', validateSession,  checkingEventDate);
app.post('/getCurrentUserEvents', validateSession,  getCurrentUserEvents)


// app.post('/registration', registerUser);
// app.post('/login', login, createSession);


server.listen(port, () => {
    console.log(`server is running at ${port}`);
});