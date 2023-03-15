const User = require("./models/User");
const getCurrentUserEvents = async (req,res) => {
    await  User.findOne({firstName: req.body.firstName, lastName: req.body.lastName ,phoneNumber: req.body.phone, mail:req.body.mail})
        .then(async(user) => {
           await res.header("Access-Control-Allow-Origin", "http://localhost:8080");
           await res.header("Access-Control-Allow-Headers", "X-Requested-With");
           await res.header("Access-Control-Allow-Credentials", true)
            res.send(user)})
}
module.exports ={getCurrentUserEvents}