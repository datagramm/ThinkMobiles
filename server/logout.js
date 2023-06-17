const Session = require('./models/Session')

const logout = (req,res) => {
    const refreshTokenId = req.cookies["refreshTokenId"];
    Session.findOneAndDelete({"refreshToken.id": refreshTokenId});

    res.clearCookie('refreshTokenId');
    res.clearCookie('accessTokenId');

    res.send({logout: true})


}
module.exports = {logout}