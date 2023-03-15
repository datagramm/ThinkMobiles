const User = require("./models/User");
const getAllUsers = async (req,res) => {

    await User.find().then(async (users) => {
        await res.setHeader('Access-Control-Allow-Origin', "http://localhost:8080");
        res.send({users:users, accessDenied: req.body.accessDenied, currentUserName: req.body.currentUserName});
    })
}
module.exports ={getAllUsers}