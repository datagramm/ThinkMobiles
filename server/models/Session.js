const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const sessionSchema = new Schema({

    userName: {
        type:String,
        required: true,
    },

    refreshToken: {
        id: {
            type:String,
            required: true,
        },
        timeExp: {
            type: String,
            required: true,
        }
    }

})

const Session = mongoose.model('Session', sessionSchema);
module.exports = Session;