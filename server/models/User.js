const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type:String,
        required: true,
    },
    mail: {
        type: String,
        required: true,
    },
    eventCount: {
        type: Number,
        required: true,
    },
    firstEventDate: {
        type: String,
        required: true,
    },
    events: [
        {
            tittle: {
                type: String,
                required: true,
            },
            description: {
                type: String,
                required: true,
            },
            startEventData: {
                type: String,
                required: true,

            },
            endEventData: {
                type: String,
                required: true,

            }
        }
    ]


})

const User = mongoose.model('User', userSchema);
module.exports = User;