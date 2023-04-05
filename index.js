const express= require('express')
const mongoose= require('mongoose')
const bodyParser = require('body-parser');
const route= require('./route/route');

const app= express();

app.use(bodyParser.json());

mongoose.connect("mongodb+srv://shivkumar:I81Q7TvA9ObKHdC3@cluster0.ub8d9.mongodb.net/ecommerce")
.then(()=> console.log("mongodb connected"))
.catch(err=>console.log(err))

app.use('/',route);

app.listen(process.env.PORT||3000,function(){
    console.log("Express ap is running"+(process.env.PORT||3000))
})
