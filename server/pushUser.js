const User = require("./models/User");
const pushUser = async (req,res) => {
    const newUser = await new User({firstName: req.body.firstName, lastName: req.body.lastName, phoneNumber: req.body.phoneNumber, mail: req.body.mail, eventCount: 0, firstEventDate: 0}).save()
    await res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    await res.header("Access-Control-Allow-Headers", "X-Requested-With");
    await res.header("Access-Control-Allow-Credentials", true)
    await res.send(newUser);
    console.log(newUser)
}
module.exports = {pushUser}