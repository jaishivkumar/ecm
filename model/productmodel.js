const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({

    title: {
        type:String, 
        required:true, 
    },
    description: {
        type: String, 
        required:true
    },
    price: {
        type:Number, 
        required:true
    },

    categories:{
        name:{
            type:String,
            required:true,
        },
          
        item:{
             type:String ,
             required: true
        },
    },
    userId: {
        type: String,
        required: true,
        ref: 'user'
    },
    size:{
        type: String,
        required:true
    },
    style: {
        type: String
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    releasedAt: {
        type: Date,
        required: true,
    }
   

}, { timestamps: true })

module.exports = mongoose.model('product', productSchema)