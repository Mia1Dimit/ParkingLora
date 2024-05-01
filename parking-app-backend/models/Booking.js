const mongoose = require('mongoose')

const BookingSchema = new mongoose.Schema({

    plate:{
        type: String,
        required: [true,'Please enter an email address']
    },
    slot:{
        type: String,
        required: [true,'Please enter a username']
    },
    duration:{
        type: String,
        required: [true,'Please enter a password']
    },
    price:{
        type: String,
        required: [true,'Please enter a plate number']
    },

})

module.exports = mongoose.model('Booking', BookingSchema)
