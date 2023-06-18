const User = require("../../models/User");
const Helpers = require('../dashboard/helpers')
const getAllUsers = async (req,res) => {

    await User.find().then(async (users) => {
        const completeUsers = await Helpers.getCurrentEventForAllUsers(users)
        res.send({users:completeUsers, accessDenied: req.body.accessDenied, currentUser: req.body.currentUserName});
    })
}

const getCurrentUserEvents = (req,res) => {
    User.findOne({firstName: req.body.firstName, lastName: req.body.lastName ,phoneNumber: req.body.phone, mail:req.body.mail})
        .then((user) => res.send(user) )
}

const pushUser = async (req,res) => {
    const newUser = await new User({firstName: req.body.firstName, lastName: req.body.lastName, phoneNumber: req.body.phoneNumber, mail: req.body.mail, eventCount: 0, firstEventDate: 0}).save()
    res.send(newUser);

}



const pushEventDate = async (req, res) => {
    let {
        startEventYear,
        startEventMonth,
        startEventDay,
        endEventYear,
        endEventMonth,
        endEventDay
    } =  req.body.event;

    let {id, firstName, lastName, phone, mail} =  req.body.currentUser;

    if (!isNaN(+startEventMonth) && !isNaN(+startEventYear) && !isNaN(+startEventDay)
        && !isNaN(+endEventMonth) && !isNaN(+endEventYear) && !isNaN(+endEventDay)
    ) {
        if (startEventMonth.length === 1) startEventMonth = '0' + startEventMonth;
        if (startEventYear.length === 1) startEventYear = '0' + startEventYear;
        if (startEventDay.length === 1) startEventDay = '0' + startEventDay;
        if (endEventMonth.length === 1) endEventMonth = '0' + endEventMonth;
        if (endEventYear.length === 1) endEventYear = '0' + endEventYear;
        if (endEventDay.length === 1) endEventDay = '0' + endEventDay;

        if (startEventMonth.length === 2 && startEventYear.length === 4 && startEventDay.length === 2 &&
            endEventMonth.length === 2 && endEventYear.length === 4 && endEventDay.length === 2
        ) {
            const currentStarEventDate = startEventYear.toString() + '/' + startEventMonth.toString() + '/' + startEventDay.toString();
            const currentEndEventDate = endEventYear.toString() + '/' + endEventMonth.toString() + '/' + endEventDay.toString();



            const user = await User.findOne({
                id: id,
                firstName: firstName,
                lastName: lastName,
                phoneNumber: phone,
                mail: mail
            })
            if (user) {

                const checkIs =  user.events.some(event => {
                    if (Helpers.intercept(new Date(`${event.startEventDate}`), new Date(`${event.endEventDate}`),
                        new Date(`${currentStarEventDate}`),
                        new Date(`${currentEndEventDate}`))) {
                        return true;
                    }
                })

                if (checkIs) res.send({error: true});
                else {
                    const event = {
                        tittle: req.body.event.tittle,
                        description: req.body.event.description,
                        startEventDate: currentStarEventDate,
                        endEventDate: currentEndEventDate,

                    }

                    await User.findOneAndUpdate({
                        firstName: req.body.currentUser.firstName,
                        lastName: req.body.currentUser.lastName,
                        phoneNumber: req.body.currentUser.phone,
                        mail: req.body.currentUser.mail,
                    }, {$inc: {eventCount: 1}, $push: {events: event}}, {new: true}).then( (user) => {
                        if (user) {

                            const now = new Date().setHours(0,0,0,0);
                            let closest = {
                                date: Infinity,
                                closest: null,
                            }

                            user.events.forEach( (event) => {

                                const date = new Date(event.startEventDate);
                                if (date >= now  && (date < new Date(closest.date) || date < closest.date)) {
                                    closest = {
                                        date: date,
                                        closest: event.startEventDate
                                    }
                                }
                            });

                            User.findOneAndUpdate({
                                firstName: req.body.currentUser.firstName,
                                lastName: req.body.currentUser.lastName,
                                phoneNumber: req.body.currentUser.phone,
                                mail: req.body.currentUser.mail,
                            },{firstEventDate:closest.closest}, {new: true}).then(async(user) =>{
                                if (user) res.send(event);
                            })

                        }
                    })

                }

            }

        }

    }
}

module.exports = {getAllUsers, getCurrentUserEvents, pushUser, pushEventDate}