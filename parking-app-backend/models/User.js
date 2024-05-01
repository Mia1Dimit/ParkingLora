const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    email:{
        type: String,
        required: [true,'Please enter an email address']
    },
    username:{
        type: String,
        required: [true,'Please enter a username']
    },
    password:{
        type: String,
        required: [true,'Please enter a password']
    },
    plateNumber:{
        type: String,
        required: [true,'Please enter a plate number']
    },

})

module.exports = mongoose.model('User', UserSchema)
