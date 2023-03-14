const {sign, verify} = require('jsonwebtoken')
const uuid = require('uuid')
const Session = require('./models/Session');

const validateSession = async (req,res,next) =>{
    const accessTokenId = await req.cookies["accessTokenId"];
    const refreshTokenId = await req.cookies["refreshTokenId"]

    try {
        const access = verify(accessTokenId, process.env.SECRET_JWT)
        if(access)
            await res.setHeader('Access-Control-Allow-Origin', "*");
            req.body.accessDenied = true;
            next()
    }
    catch (err){
        if (err){
            const session = await Session.findOne({"refreshToken.id": refreshTokenId})
            console.log(session)
            const currentTimeInSeconds = Math.round(new Date().getTime() / 1000);
            if (!session) {
                // await res.setHeader('Access-Control-Allow-Origin', "*");
                // res.send(false)
                req.body.accessDenied = true
                next()
            } else {

                const newRefreshTokenId = await uuid.v4();
                await Session.findOneAndUpdate({"refreshToken.id": refreshTokenId},
                    {
                        refreshToken: {id: newRefreshTokenId, timeExp: currentTimeInSeconds},
                    }, {new: true}).then(async () =>{

                    const newAccessTokenId = sign({},process.env.SECRET_JWT, {expiresIn: '300s'} )
                    await res.cookie('accessTokenId', newAccessTokenId, { httpOnly: true, sameSite: 'lax'},);
                    await res.cookie('refreshTokenId', newRefreshTokenId, {maxAge: 5184000000, httpOnly: true, sameSite: 'lax'},);
                    await res.setHeader('Access-Control-Allow-Origin', "*");
                    req.body.accessDenied = true;
                    next()
                })


            }
        }
    }
}
module.exports = {validateSession};
