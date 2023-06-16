const bcrypt = require('bcrypt');

const Client = require("./models/Client");
const registerUser = (req, res) => {
    const {username, password, mail} = req.body;
    bcrypt.hash(password, 10).then((hash) => {
        new Client({
            login: username,
            mail: mail,
            password: hash,
        }).save().then( () => {
            res.send({success: true, err: false});
        }).catch( err => {
            if (err) res.status(400).send({success: false, err: err});
        });


    });
};

module.exports = {registerUser}