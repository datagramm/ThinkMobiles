const User = require("./models/User");
const getCurrentUserEvents = async (req,res) => {
    await  User.findOne({firstName: req.body.firstName, lastName: req.body.lastName ,phoneNumber: req.body.phone, mail:req.body.mail})
        .then(async(user) => {
            await res.setHeader('Access-Control-Allow-Origin', "*");
            res.send(user)})
}
module.exports ={getCurrentUserEvents}