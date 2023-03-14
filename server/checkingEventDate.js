const User = require('./models/User');

function intercept(start1, end1, start2, end2) {
    return (Math.max(0, Math.min(end2, end1) - Math.max(start1, start2) + 1)) > 0
}

const checkingEventDate = async (req, res) => {
    let {
        startEventYear,
        startEventMonth,
        startEventDay,
        endEventYear,
        endEventMonth,
        endEventDay
    } = await req.body.event;

    let {id, firstName, lastName, phone, mail} = await req.body.currentUser;
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

            console.log(currentStarEventDate, currentEndEventDate)

            const user = await User.findOne({
                id: id,
                firstName: firstName,
                lastName: lastName,
                phoneNumber: phone,
                mail: mail
            })
            if (user) {

                const checkIs =  user.events.some(event => {
                    if (intercept(new Date(`${event.startEventDate}`), new Date(`${event.endEventDate}`),
                        new Date(`${currentStarEventDate}`),
                        new Date(`${currentEndEventDate}`))) {
                        return true;
                    }
                })

                if (checkIs) {
                    await res.setHeader('Access-Control-Allow-Origin', "*");
                    res.send({error: true});
                } else {
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
                    }, {$inc: {eventCount: 1}, $push: {events: event}}, {new: true}).then(async (user) => {
                        if (user) {


                            const now = new Date(`${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()}`);
                            let closest = Infinity;

                          const closestDate =  user.events.forEach( (event) => {
                                const date = new Date(event.startEventDate);
                                if (date >= now  && (date < new Date(closest) || date < closest)) {
                                    return event.startEventDate;
                                }
                            });


                            await User.findOneAndUpdate({
                                firstName: req.body.currentUser.firstName,
                                lastName: req.body.currentUser.lastName,
                                phoneNumber: req.body.currentUser.phone,
                                mail: req.body.currentUser.mail,
                            },{firstEventDate: closestDate}).then(async(user) =>{
                                if (user){
                                    await res.setHeader('Access-Control-Allow-Origin', "*");
                                    res.send(event);                                }
                            })


                        }
                    })

                }

            }

        }

    }
}

module.exports = {checkingEventDate};