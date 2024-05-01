const router = require('express').Router()
const ParkingSpot = require('../models/ParkingSpot')


router.get('/',(req,res)=>{
    ParkingSpot.find().then(spots => {
        res.status(200).json(spots)
    }).catch(err =>{
        res.status(500).json({error: err.message})
    })
});

router.post('/booking',async (req,res)=>{
    const { name } = req.body;

    ParkingSpot.findOneAndUpdate({ name: name }, { status: 'booked' }, (error) => {
        if (error) {
          console.log(error);
          res.status(500).send("Error");
        } else {
          res.status(200).send("Parking spot booked");
        }
      });
})

module.exports = router