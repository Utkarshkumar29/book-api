const express=require('express')
const app=express()
const userRoutes=require('./routes/userRoutes')
const bookRoutes=require('./routes/bookRoutes')
const logger = require('./middleware/logger')

app.use(express.json())
app.use(logger)
app.use('/book',bookRoutes)
app.use('/user',userRoutes)
require('dotenv').config()

app.get('/',(req,res)=>{
    res.send("Hello World")
})

app.listen(process.env.PORT || 5000,()=>{
    console.log('server running at 5000')
})