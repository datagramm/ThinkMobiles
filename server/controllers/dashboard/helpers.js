

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

const getCurrentEventForAllUsers = async (users) => {
    let completeUsers = []
    await users.forEach(user => {
        completeUsers.push(getCurrentEventDate(user))
    })
    return completeUsers;

}

const intercept = (start1, end1, start2, end2) => {
    return (Math.max(0, Math.min(end2, end1) - Math.max(start1, start2) + 1)) > 0
}

module.exports = {getCurrentEventForAllUsers, intercept}