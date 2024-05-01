const router = require('express').Router()
const Booking = require('../models/Booking')

router.get('/',(req,res)=>{
    Booking.find().then(bookings => {
        res.status(200).json(bookings)
        //res.render('app.component.html', { name: json.parse(User.username)});
    }).catch(err =>{
        res.status(500).json({error: err.message})
    })
})

router.post('/booking',async (req,res)=>{
    const newBooking = new Booking(req.body)
    newBooking.save().then(user =>{
        res.status(201).json(user)
    }).catch(err=>{
        res.status(500).json({error: err.message})
    })
    
})

module.exports = router