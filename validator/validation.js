const mongoose = require("mongoose")

const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) {
        return false
    }
    if (typeof value === 'string' && value.trim().length == 0) {
        return false
    }
    return true

}

const isValidRequestBody = function (request) {
    return (Object.keys(request).length > 0)
}
const isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId)
}
// function for title validation
const isValidTitle = function (title) {
    return ["Mr", "Mrs", "Miss"].indexOf(title) !== -1
}

const isValidName = function (name) {
    let nameRegex = /^[.a-zA-Z\s,-]+$/
    return nameRegex.test(name)
}
//regex for name 
const isValidEmail = function (email) {
    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    return emailRegex.test(email)
}
// regex for email validation

const isValidPhone = function (phone) {
    let mobileRegex = /^[0]?[6789]\d{9}$/
    return mobileRegex.test(phone)
}
const isValidPassword = function (password) {
    let passwordregex = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#@$%&? "])[a-zA-Z0-9!#@$%&?]{8,15}$/
    return passwordregex.test(password)

}

module.exports = {
    isValid,
    isValidEmail,
    isValidName,
    isValidObjectId,
    isValidPassword,
    isValidPhone,
    isValidRequestBody,
    isValidTitle
}