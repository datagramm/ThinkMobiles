const {sign, verify} = require('jsonwebtoken')
const uuid = require('uuid')
const Session = require('../models/Session');

const validateSession = async (req,res,next) =>{
    const accessTokenId =  req.cookies["accessTokenId"];
    const refreshTokenId = req.cookies["refreshTokenId"]

    try {
        const access = verify(accessTokenId, process.env.SECRET_JWT)
        if(access) {
            const session = await Session.findOne({"refreshToken.id": refreshTokenId})
            req.body.accessDenied = true;
            const userName = session.userName
            req.body.currentUserName = userName
            next()
        }
    }
    catch (err){
        if (err){
            const session = await Session.findOne({"refreshToken.id": refreshTokenId})

            if (!session) res.status(401).json({users:false, accessDenied: false})
            else {
                const userName = session.userName
                req.body.currentUserName = userName
                const newRefreshTokenId =  uuid.v4();
                await Session.findOneAndUpdate({"refreshToken.id": refreshTokenId},
                    {
                        refreshToken: {id: newRefreshTokenId, timeExp: '60d'},
                    }, {new: true}).then(() =>{
                    const newAccessTokenId = sign({login: session.userName },process.env.SECRET_JWT, {expiresIn: '900s'} )
                    res.cookie('accessTokenId', newAccessTokenId, { httpOnly: true, sameSite: 'none', secure: true},);
                    res.cookie('refreshTokenId', newRefreshTokenId, {maxAge: 5184000000, httpOnly: true, sameSite: 'none', secure: true},);
                    req.body.accessDenied = true;
                    next()
                })


            }
        }
    }
}
module.exports = {validateSession};
