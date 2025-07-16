import mongoose from "mongoose"

const productschema = new mongoose.Schema({
    id :{type:Number},
    image :{type:String},
    name :{type:String},
    category:{type:String},
    new_price:{type:Number},
    old_price:{type:Number},
    isAvailable:{type: Boolean, default: true},

},{ timestamps: true })

const Product = mongoose.model("Product",productschema,"products")

export default Product;