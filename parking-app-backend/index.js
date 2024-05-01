require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const port = process.env.PORT || 3000 

//Routes
const userRoutes = require('./api/UserRoutes')
const ParkingGroupRoutes = require('./api/ParkingGroupRoutes')
const bookingRoutes = require('./api/BookingRoutes')
const ParkingSpotRoutes = require('./api/ParkingSpotRoutes')
const sensorDataRoutes = require('./api/sensorDataRoutes')

const app = express()
app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>{
    res.send('hello world')
})

app.use('/users', userRoutes)
app.use('/bookings', bookingRoutes)
app.use('/groups', ParkingGroupRoutes)
app.use('/spots', ParkingSpotRoutes)
app.use('/sensorData', sensorDataRoutes)

mongoose.connect(process.env.MONGODB,{useUnifiedTopology: true})
.then(()=>{
    
    app.listen(port,()=>{
        console.log('app running...')
    })
}).catch(err=>console.log(err))