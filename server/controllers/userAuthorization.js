const bcrypt = require('bcrypt');

const Client = require("../models/Client");
const Session = require("../models/Session");
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

const logout = (req,res) => {
    const refreshTokenId = req.cookies["refreshTokenId"];
    Session.findOneAndDelete({"refreshToken.id": refreshTokenId});

    res.clearCookie('refreshTokenId');
    res.clearCookie('accessTokenId');

    res.send({logout: true})


}

module.exports = {registerUser, login, logout}