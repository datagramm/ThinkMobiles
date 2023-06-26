const Session = require('../models/Session')
const {sign} = require('jsonwebtoken')
const uuid = require("uuid");
const createSession =  (req, res) => {


    const accessTokenId = sign({login: req.body.userName}, process.env.SECRET_JWT, {expiresIn: '10s'})
    const refreshTokenId =  uuid.v4();
    new Session({
        userName: req.body.userName,
        refreshToken: {
            id: refreshTokenId,
            timeExp: '60d',
        }
    }).save();

    res.cookie('accessTokenId', accessTokenId,{  httpOnly: true, sameSite: 'none', secure: true },);
    res.cookie('refreshTokenId', refreshTokenId,{ maxAge: 5184000000, httpOnly: true, sameSite: 'none',secure: true},);
    res.status(200).json({err: false})
}

module.exports = {createSession}