const Client = require("./models/Client");
const bcrypt = require('bcrypt')
const login = async (req, res, next) => {
    const {username, password} = req.body;
    const user = await Client.findOne({login: username});
    if (!user) {
        res.header("Access-Control-Allow-Origin", "http://localhost:8080");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Credentials", true)
        res.send({err: true,  message: 'User not found'})
        return
    }
    const dbPassword = user.password;
    bcrypt.compare(password, dbPassword).then( async (match) => {
        if (!match) {
            res.header("Access-Control-Allow-Origin", "http://localhost:8080");
            res.header("Access-Control-Allow-Headers", "X-Requested-With");
            res.header("Access-Control-Allow-Credentials", true)
            res.send({err: true, message: 'Wrong password'});
        } else {


            res.header("Access-Control-Allow-Origin", "http://localhost:8080");
            res.header("Access-Control-Allow-Headers", "X-Requested-With");
            res.header("Access-Control-Allow-Credentials", true)
            req.body.userName = await user.login
            next()
        }

    });

}
module.exports = {login}