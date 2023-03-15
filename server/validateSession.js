const {sign, verify} = require('jsonwebtoken')
const uuid = require('uuid')
const Session = require('./models/Session');

const validateSession = async (req,res,next) =>{
    const accessTokenId = await req.cookies["accessTokenId"];
    const refreshTokenId = await req.cookies["refreshTokenId"]

    try {
        const access = verify(accessTokenId, process.env.SECRET_JWT)
        if(access)
           await res.header("Access-Control-Allow-Origin", "http://localhost:8080");
           await res.header("Access-Control-Allow-Headers", "X-Requested-With");
           await res.header("Access-Control-Allow-Credentials", true)
            req.body.accessDenied = true;
            next()
    }
    catch (err){
        if (err){
            const session = await Session.findOne({"refreshToken.id": refreshTokenId})
            console.log(session)

            if (!session) {
                await res.header("Access-Control-Allow-Origin", "http://localhost:8080");
                await res.header("Access-Control-Allow-Headers", "X-Requested-With");
                await res.header("Access-Control-Allow-Credentials", true)
                res.send({users:false, accessDenied: false})

            } else {
                req.body.currentUserName = session.userName

                const newRefreshTokenId = await uuid.v4();
                await Session.findOneAndUpdate({"refreshToken.id": refreshTokenId},
                    {
                        refreshToken: {id: newRefreshTokenId, timeExp: '60d'},
                    }, {new: true}).then(async () =>{

                    const newAccessTokenId = sign({login: session.userName },process.env.SECRET_JWT, {expiresIn: '10s'} )
                    await res.header("Access-Control-Allow-Origin", "http://localhost:8080");
                    await res.header("Access-Control-Allow-Headers", "X-Requested-With");
                    await res.header("Access-Control-Allow-Credentials", true)
                    await res.cookie('accessTokenId', newAccessTokenId, { httpOnly: true, sameSite: 'none', secure: true},);
                    await res.cookie('refreshTokenId', newRefreshTokenId, {maxAge: 5184000000, httpOnly: true, sameSite: 'none', secure: true},);
                    req.body.accessDenied = true;
                    req.body.currUserName = true

                    next()
                })


            }
        }
    }
}
module.exports = {validateSession};
