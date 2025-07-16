import dotenv from 'dotenv'
dotenv.config()

import Product from "../models/Product.js";
import User from "../models/User.js";
import jwt from 'jsonwebtoken'

export const getAllProduct = async (req, res) => {
  try {
    const product = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(product);
  } catch (error) {
    console.error("error in fetching products", error);
    res.status(500).json({ messege: "Internal Server error" });
  }
};

export const getNewProduct = async (req, res) => {
  try {
    const product = await Product.find().sort({ createdAt: -1 }).limit(8);
    res.status(200).json(product);
  } catch (error) {
    console.error("error in fetching products", error);
    res.status(500).json({ messege: "Internal Server error" });
  }
};

export const getMenProduct = async (req, res) => {
  try {
    const product = await Product.find({category:'men'}).sort({ createdAt: -1 }).limit(4);
    res.status(200).json(product);
  } catch (error) {
    console.error("error in fetching product", error);
    res.status(500).json({ messege: "Internal Server error" });
  }
};

export const AddProduct = async (req, res) => {
  try {
    const { id, image, name, category, new_price, old_price } = req.body;
    const newproduct = new Product({
      id,
      image,
      name,
      category,
      new_price,
      old_price,
    });
    await newproduct.save();
    console.log(newproduct);
    res.status(200).json({ messege: "Product Created Successfully" });
  } catch (error) {
    console.error("error in Create product", error);
    res.status(500).json({ messege: "Internal Server error" });
  }
};

export const removeProduct = async (req, res) => {
  try {
    const remove = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json(remove);
  } catch (error) {
    console.error("error in drop product", error);
    res.status(500).json({ messege: "Internal Server error" });
  }
};

// middleware 
export const FetchUser =(req,res,next)=>{
const token = req.header("auth-token");
if (!token) {
  res.status(401).send({error:"please authenticate using valid token"})
}else{
  try {
    const data = jwt.verify(token,process.env.JWT_KEY)
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({error:"please authenticate using valid token"})
  }
}
}
 
export const addtoCart = async (req, res) => {
 let userdata = await User.findOne({_id:req.user.id});
if (userdata.cartdata[req.body.itemId]) {
  userdata.cartdata[req.body.itemId] += 1;
} else {
  userdata.cartdata[req.body.itemId] = 1;
} await User.findOneAndUpdate({_id:req.user.id},{cartdata:userdata.cartdata})
 res.send("Added")
}

export const removeFromCart = async (req, res) => {
 let userdata = await User.findOne({_id:req.user.id});
 if(userdata.cartdata[req.body.itemId]>0)
 userdata.cartdata[req.body.itemId] -= 1;
 await User.findOneAndUpdate({_id:req.user.id},{cartdata:userdata.cartdata})
 res.send("Added")
}
export const UpdateProduct = () => {};
