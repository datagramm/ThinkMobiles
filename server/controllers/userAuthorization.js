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
            res.status(200).json({success: true, err: false});
        }).catch( err => {
            if (err) res.status(500).json({success: false, err: err});
        });


    });
};

const login = async (req, res, next) => {
    const {username, password} = req.body;
    const user = await Client.findOne({login: username});
    if (!user) {
        res.status(401).json({err: true,  message: 'User not found'})
        return
    }
    const dbPassword = user.password;
    bcrypt.compare(password, dbPassword).then( async (match) => {
        if (!match) res.status(401).json({err: true, message: 'Wrong password'});
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

    res.status(200).json({logout: true})


}

module.exports = {registerUser, login, logout}