const Session = require('./models/Session')

const logout =  async (req,res) => {
    const refreshTokenId = await req.cookies["refreshTokenId"];
    Session.findOneAndDelete({"refreshToken.id": refreshTokenId});

    res.clearCookie('refreshTokenId');
    res.clearCookie('accessTokenId');

    res.send({logout: true})


}
module.exports = {logout}