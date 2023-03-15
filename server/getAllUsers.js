const User = require("./models/User");

const getCurrentEventDate = (user) => {
    const currentDate = new Date().setHours(0,0,0,0);
    let closest = {
        date: Infinity,
        closest: null,
    }
    user.events.forEach((event) => {

        const date = new Date(event.startEventDate);
        if (date >= currentDate && (date < new Date(closest.date) || date < closest.date)) {
            closest = {
                date: date,
                closest: event.startEventDate
            }
        }
    });
    user.firstEventDate = closest.closest;
    return user
}

const getCurreneEventForAllUsers = async (users) => {
    let completeUsers = []
    await users.forEach(user => {
       completeUsers.push(getCurrentEventDate(user))
    })
    return completeUsers;

}
const getAllUsers = async (req,res) => {

    await User.find().then(async (users) => {
        await res.setHeader('Access-Control-Allow-Origin', "http://localhost:8080");
        const completeUsers = await getCurreneEventForAllUsers(users)
        res.send({users:completeUsers, accessDenied: req.body.accessDenied, currentUser: req.body.currentUserName});
    })
}
module.exports ={getAllUsers}