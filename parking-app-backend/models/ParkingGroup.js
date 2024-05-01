const mongoose = require('mongoose')

const ParkingGroupSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true,'Please enter a title']
    },
    latitude:{
        type: String,
        required: [true,'Please enter a latitude']
    },
    longitute:{
        type: String,
        required: [true,'Please enter a longitude']
    },
    elcharger:{
        type: String,
        required: [true,'Please enter if elcharger exists']
    },
    availableSpotNumber:{
        type: Number,
    },
    maximumParkingDuration:{
        type: String,
    },
    refParkingSpot:{
        type: String,Array,
    },
    totalSpotNumber:{
        type: Number,
    },

})

module.exports = mongoose.model('ParkingGroup', ParkingGroupSchema)