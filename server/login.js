const Client = require("./models/Client");
const bcrypt = require('bcrypt')
const login = async (req, res, next) => {
    const {username, password} = req.body;
    const user = await Client.findOne({login: username});
    if (!user) {
        res.send({err: true,  message: 'User not found'})
        return
    }
    const dbPassword = user.password;
    bcrypt.compare(password, dbPassword).then( async (match) => {
        if (!match) res.send({err: true, message: 'Wrong password'});
        else {
            req.body.userName = await user.login
            next()
        }

    });

}
module.exports = {login}