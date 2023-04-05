
const usercontroller=require('../controller/usercontroller')
const productcontroller=require("../controller/produccontroller");
const auths=require('../middlewares/auths')

const express= require('express');
const router= express.Router()

// user api

router.post("/register", usercontroller.createUser) 

router.post("/login", usercontroller.userLogIn) 
 
//  product api

router.post("/product",auths.authentication,auths.userAuthorization, productcontroller.createProduct) 

router.get('/product', auths.authentication, productcontroller.getProduct) 

router.get('/product/:productId', auths.authentication, productcontroller.getProductById) 

router.put('/product/:productId',auths.authentication,auths.productAuthorization,productcontroller.productUpdate) 

router.delete('/product/:productId',auths.authentication,auths.productAuthorization,productcontroller.delProductById)


module.exports= router