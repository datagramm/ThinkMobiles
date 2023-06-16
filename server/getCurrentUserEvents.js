const User = require("./models/User");
const getCurrentUserEvents = (req,res) => {
         User.findOne({firstName: req.body.firstName, lastName: req.body.lastName ,phoneNumber: req.body.phone, mail:req.body.mail})
        .then((user) => res.send(user) )
}
module.exports ={ getCurrentUserEvents }
