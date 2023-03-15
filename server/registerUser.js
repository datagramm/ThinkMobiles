const bcrypt = require('bcrypt');

const Client = require("./models/Client");
const registerUser = async (req, res) => {
    const {username, password, mail} = req.body;
    bcrypt.hash(password, 10).then((hash) => {
        new Client({
            login: username,
            mail: mail,
            password: hash,
        }).save().then( async () => {
            await res.setHeader('Access-Control-Allow-Origin', "*");
            res.send({success: true, err: false});
        }).catch(async err => {
            if (err) {
                await res.setHeader('Access-Control-Allow-Origin', "*");
                res.status(400).send({success: false, err: err});
            }
        });


    });
};

module.exports = {registerUser}