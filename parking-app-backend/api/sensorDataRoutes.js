const router = require('express').Router()
const ParkingSpot = require('../models/ParkingSpot')

router.post('/', (req,res)=>{
    //const { name } = req.body;
    if(req.body.carStatus==0) {
        ParkingSpot.findOneAndUpdate({ name: "D5" }, { status: 'occupied' }, (error) => {
            if (error) {
              console.log(error);
              res.status(500).send("Error");
            } 
        });
    }
    console.log(req.body.carStatus)
    
    //res.send(req.body)
    //{ temperature: '+18.0', batteryVoltage: '3.29', carStatus: 1 }
})

module.exports = router