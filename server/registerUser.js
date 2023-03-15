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
            await res.header("Access-Control-Allow-Origin", "http://localhost:8080");
            await res.header("Access-Control-Allow-Headers", "X-Requested-With");
            await res.header("Access-Control-Allow-Credentials", true)
            res.send({success: true, err: false});
        }).catch(async err => {
            if (err) {
                await res.header("Access-Control-Allow-Origin", "http://localhost:8080");
                await res.header("Access-Control-Allow-Headers", "X-Requested-With");
                await res.header("Access-Control-Allow-Credentials", true)
                res.status(400).send({success: false, err: err});
            }
        });


    });
};

module.exports = {registerUser}