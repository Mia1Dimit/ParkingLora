const router = require('express').Router()
const ParkingGroup = require('../models/ParkingGroup')


router.get('/',(req,res)=>{
    ParkingGroup.find().then(groups => {
        res.status(200).json(groups)
    }).catch(err =>{
        res.status(500).json({error: err.message})
    })
});

setInterval(() => {
    ParkingGroup.find({}, (err, groups) => {
      if (err) {
        console.log(err);
      } else {
        groups.forEach((group) => {
            let load = 1 - (group.availableSpotNumber/group.totalSpotNumber);

            if (load >= 0.8 ) {
                ParkingGroup.findOneAndUpdate({ _id: group._id }, { zone: 'A' }, (error) => {
                    if (error) {
                    console.log(error);
                    }
                });
            }else{
                if(group.title == "Department of Electrical and Computer Engineering Parking"){
                    ParkingGroup.findOneAndUpdate({title:"Department of Electrical and Computer Engineering Parking"}, { zone: 'B' }, (error) => {
                        if (error) {
                          console.log(error);
                        }
                      });
                }
                
            }
        });
        }
    });
}, 5000); // update parking group zones every 60 seconds

router.post('/home',(_req,_res)=>{});


router.post('/booking',async (req,res)=>{
    const { refParkingSpot } = req.body;

    ParkingGroup.findOneAndUpdate({ refParkingSpot: refParkingSpot }, { $inc: { availableSpotNumber: -1 } }, (error) => {
        if (error) {
          console.log(error);
          res.status(500).send("Error");
        } else {
          res.status(200).send("Parking spot booked");
        }
      });
})


  
module.exports = router