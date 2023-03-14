const User = require("./models/User");
const getAllUsers = async (req,res) => {
    await User.find().then(async (users) => {
        await res.setHeader('Access-Control-Allow-Origin', "*");
        res.send({users:users, accessDenied: req.body.accessDenied});
    })
}
module.exports ={getAllUsers}