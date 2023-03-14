const User = require("./models/User");
const pushUser = async (req,res) => {
    const newUser = await new User({firstName: req.body.firstName, lastName: req.body.lastName, phoneNumber: req.body.phoneNumber, mail: req.body.mail, eventCount: 0, firstEventDate: 0}).save()
    await res.setHeader('Access-Control-Allow-Origin', "*");
    await res.send(newUser);
    console.log(newUser)
}
module.exports = {pushUser}