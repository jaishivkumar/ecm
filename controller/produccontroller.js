
 const  productmodel= require('../model/productmodel')
 const usermodel= require('../model/usermodel');
const {
    isValid,
    isValidObjectId,
    isValidRequestBody,
                         } = require("../validator/validation")



/**________________________________ create product______________________________________________________ */

const createProduct = async function (req, res) {
    try {
        const productdata = req.body;

        if (!isValidRequestBody(productdata)) return res.status(400).send({
            status: false, message: "Invalid request parameters. Please provide product details"
        })

        let { title,description ,  price, categories, userId,   size, releasedAt } = productdata;

        if (!isValid(title))
            return res.status(400).send({ status: false, message: "Title is required" })

        const isUniqueTitle = await productmodel.findOne({ title })
        if (isUniqueTitle) {
            return res.status(400).send({ status: false, message: "Title is already present " })
        }

        if (!isValid(description)) {
            return res.status(400).send({ status: false, message: "description,is required" })
        }

        if (!isValid(price)) {
            return res.status(400).send({ status: false, message: "price is required" })
        }
        if (!isValid(categories)) {
            return res.status(400).send({ status: false, message: "categories is required" })
        }

            if (categories.name) {
                if (!isValid(categories.name))                               
                    return res.status(400).send({ status: false, message: "provide  categories  name" })
            }
            if (categories.item) {
                if (!isValid(categories.item))
                    return res.status(400).send({ status: false, message: "provide   product items name" })
            }
            if (!isValid(userId)) {
                return res.status(400).send({ status: false, message: "userId is required" })
            }
    
            if (!isValidObjectId(userId)) {
                return res.status(400).send({ status: false, message: "userId is invalid" })
            }
    
            const isUniqueUserId = await usermodel.findOne({ userId })
            if (isUniqueUserId.length == 0) {
                return res.status(400).send({ status: false, message: "please provide valid userId" })
            }

            if(!isValid(size)){
                return res.status(400).send({status:false, msg:'provide currect size'})
            }
            if (!isValid(releasedAt)) {
                return res.status(400).send({ status: false, message: "releaseAT is required" })
            }
            if (!(isValidDate(releasedAt))) {
                return res.status(400).send({ status: false, message: "Date must be in the format YYYY-MM-DD" })
            }

        const data = await productmodel.create(productdata)
        const releasedAt1 = new Date(data.releasedAt).toISOString().slice(0, 10)


        let obj = {
            _id: data._id,
            title: data.title,
            ddescription: data.description,
            userId: data.userId,
           price:data.price,
           size:data.size,
            categories: data.categories,
            deletedAt: data.deletedAt,
            releasedAt: releasedAt1,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt

        }

        return res.status(201).send({ status: true, message: 'Success', data: obj })

    }
    catch (err) { return res.status(500).send({ message: "Error", error: err.message }) }
}

/**_________________________________________get product by query_______________________________________________________________ */
const getProduct = async function (req, res) {
    try {
        const data = req.query;

        if (!isValidRequestBody(data)) return res.status(400).send({
            status: false, message: "Invalid request parameters. Please provide product details"
        })

        let { userId, categories,  description , price , } = data;

        if (userId) {
            if (!isValidObjectId(userId)) {
                return res.status(400).send({ status: false, msg: "userId is not valid author id please check it" })
            }
        }
        if (isValid(userId)) {
            let user = await productmodel.find({ userId: userId });
            if (user.length == 0) {
                res.status(400).send({ status: false, msg: "no data found with this user id " })
                return;
            }
            obj.userId = userId
        }

        if (isValid(categories)) {
            let cat = await productodel.find({ categories: categories });
            if (cat.length == 0) {
                res.status(400).send({ status: false, msg: "category is not matching " })
                return;
            }
            obj.categories = categories

        }
        if(isValid(description)){
            return res.status(400).send({status:false, msg:'description provide'})
        }
        if(!isValid(price)){
            return res.status(400).send({status:false, msg:'price  should must  present'})
        }
        res.status(200).send({ status: true, message: 'product list', data: findproduct })

    }
    catch (err) { return res.status(500).send({ message: "Error", error: err.message }) }

}
/**____________________________________ get && search productbyid__________________________________________________________________ */

const getProductById = async function (req, res) {
    try {
        const productId = req.params.productId

        if (!isValidObjectId(productId)) return res.status(400).send({ status: false, message: " invalid  productId" })

        const data = await productmodel.findOne({ _id:productId })

        if (!data) return res.status(404).send({ status: false, message: "product does not exist" })

        if (data.isDeleted) return res.status(404).send({
            status: false, message: " product already deleted"
        })
       
        const releasedAt1 = new Date(data.releasedAt).toISOString().slice(0, 10)

        let obj = {
            _id: data._id,
            title: data.title,
            ddescription: data.description,
            userId: data.userId,
           price:data.price,
           size:data.size,
            categories: data.categories,
            deletedAt: data.deletedAt,
            releasedAt: releasedAt1,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt

        }
        return res.status(200).send({ status: true, message: "product List", data: obj })
    }
    catch (err) { return res.status(500).send({ message: "Error", error: err.message }) }
}
/**_______________________________________________updateproduct _________________________________________________ */

const productUpdate = async function (req, res) {
    try {
        let productId = req.params.productId
        if (!isValidObjectId(productId)) return res.status(400).send({ status: false, message: "productId invalid" })
        let updateData = req.body

        if (!isValidRequestBody(updateData)) return res.status(400).send({
            status: false, message: "Please provide product details"
        })

        let { title, price ,  size, releasedAt } = updateData

        let validProduct = await prouductmodel.findOne({ _id: productId })

        if (!validProduct) return res.status(404).send({ status: false, message: "product not found" })

        if (validProduct.isDeleted) { return res.status(404).send({ status: false, message: "product is already Deleted" }) }
        
        if (Object.keys(updateData).indexOf("title") !== -1) {
            if (!isValid(title)) return res.status(400).send({ status: false, message: "Declared title is empty, You need to add some value" })
        }
        if (title) {
            if (isValid(title)) {
                
                let checktitle = await productmodel.findOne({ title: title })
                if (checktitle) {
                    return res.status(400).send({ status: false, message: "Title is already exits plz enter a new title" })
                } else {
                    validproduct.title = title
                }        
        }}
        if(isValid(price)){
            return res.status(400).send({status:false, msg:'price should be change'})
        }
         if(!isValid(size)){
            return res.status(400).send({status:false, msg:'size should be diffferent'})
         }
        if (releasedAt) {
            if (isValid(releasedAt)) {
                if (!(isValidDate(releasedAt))) { return res.status(400).send({ status: false, message: "Date must be in the format YYYY-MM-DD" }) }

                validProduct.releasedAt = releasedAt

            } else {
                return res.status(400).send({ status: false, message: "provide valid date" })

            }
        }

        validProduct.save();

        return res.status(200).send({ status: true, message: "Update succesful", data: validProduct })

    }
    catch (err) { return res.status(500).send({ message: "Error", error: err.message }) }
}
/*________________________________________delete productby id_______________________________________________________________*/

const delProductById = async function (req, res) {
    try {
        let productId = req.params.productId
        if (!isValidObjectId(productId)) return res.status(400).send({ status: false, message: "productId invalid" })

        let validProduct = await productmodel.findById(productId)

        if (validProduct.length == 0) return res.status(404).send({ status: false, message: "product not found" })

        if (validProduct.isDeleted == true) return res.status(404).send({ status: false, message: "product is already Deleted" })

        let deletion = await productmodel.findOneAndUpdate({ _id: productId }, { $set: { isDeleted: true, deletedAt: new Date() } }, { new: true })

        res.status(200).send({ status: true, message: 'product deleted successfully ', data: deletion })  

    }
    catch (err) { return res.status(500).send({ message: "Error", error: err.message }) }
}



module.exports.createProduct = createProduct
module.exports.getProduct = getProduct
module.exports.getProductById = getProductById
module.exports.productUpdate =productUpdate
module.exports.delProductById = delProductById