require('dotenv').config()
const express=require('express')
const app=express()
require('express-async-errors')
const connectDB=require('./db/connect.js')
const error=require('./middlewares/error.js')
const notFound=require('./middlewares/notFound')
const userRoute = require('./Routers/userRoutes.js')
const accidentRoute = require('./Routers/accidentRoute.js')

const start=async()=>{
   await  connectDB(process.env.MONGO_URI)
   app.listen(5000,()=>{
      console.log('Database connected and server running on port 5000')
   })
}
start()
app.use(express.json())
app.use('/',userRoute)
app.use('/accidents',accidentRoute)
app.use(notFound)
app.use(error)







