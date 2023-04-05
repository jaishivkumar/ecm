const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')



const isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId)
}

const authentication = async function (req, res, next) {
    try {
        let token = (req.headers["x-api-key"])

        if (!token) {
            return res.status(400).send({ status: false, msg: "Token must be present", });
        }

        let decodedToken = jwt.verify(token ) 
         
        if (!decodedToken) {
            return res.status(400).send({ status: false, msg: "Token is invalid" });
        }
        next()
    }

    catch (err) {
        return res.status(500).send({ msg: "Error", error: err.message })
    }

}

const userAuthorization = async (req, res, next) => {
    try {

        let userId = req.body.userId

        if (!isValidObjectId(userId)) {
            return res.status(400).send({ status: false, message: "userId is invalid" })
        }

        let token = (req.headers["x-api-key"])
        let decodedToken = jwt.verify(token)           // verifying the token 

        let tokenUserId = decodedToken.userId

        const isIdExist = await userModel.findOne({ _id: userId });

        if (!isIdExist) return res.status(404).send({ status: false, message: "User Id does not exist" })


        if (userId !== tokenUserId) return res.status(403).send({ status: false, message: "User not Authorised to create a new Book" })

        next();

    } catch (err) {
        return res.status(500).send({ msg: "Error", error: err.message })
    }

}

const productAuthorization = async function (req, res, next) {
    try {

        let productId = req.params.productId

        if (!isValidObjectId(productId)) {
            return res.status(400).send({ status: false, message: "productId is invalid" })
        }

        let token = (req.headers["x-api-key"])
        let decodedToken = jwt.verify(token)           
        let tokenuserId = decodedToken.userId;
        if (produtctId) {
            let data = await booksModel.findOne({ _id: productId, userId: tokenuserId })

            if (data === null) {
                return res.status(403).send({ status: false, msg: "you are not authorize" });

            }
        }
        next()
    }
    catch (err) {
        return res.status(500).send({ msg: "Error", error: err.message })
    }

}

module.exports.authentication = authentication
module.exports.productAuthorization = productAuthorization
module.exports.userAuthorization = userAuthorization