const mongoose = require('mongoose')

const ParkingSpotSchema = new mongoose.Schema({
    name:{
        type: String,
    },
    status:{
        type: String,
    },
    refDevice:{
        type: String,
    },
    refParkingGroup:{
        type: String,
    },
})

module.exports = mongoose.model('ParkingSpot', ParkingSpotSchema)