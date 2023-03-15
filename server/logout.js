const Session = require('./models/Session')
const logout =  async (req,res) => {
    const refreshTokenId = await req.cookies["refreshTokenId"];
    await Session.findOneAndDelete({"refreshToken.id": refreshTokenId});

    await res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    await res.header("Access-Control-Allow-Headers", "X-Requested-With");
    await res.header("Access-Control-Allow-Credentials", true)

    res.clearCookie('refreshTokenId');
    res.clearCookie('accessTokenId');
    await res.send({logout: true})


}
module.exports = {logout}