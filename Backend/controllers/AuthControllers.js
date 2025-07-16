import dotenv from 'dotenv'
dotenv.config()

import bcrypt from "bcryptjs";
import User from '../models/User.js'
import jwt from 'jsonwebtoken'

export const RegisterUser = async (req, res) => {
  try {
    const { name, email, password,role,cartdata } = req.body;
       if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if User already registered
    const alreadyExist = await User.findOne({ email });
    if (alreadyExist) {
     return res.status(400).json({ message: "Email already Registered" });
    }
     let cart ={};
     for (let i = 0; i < 300; i++) {
        cart[i]=0;
      
     }

    const hashedpassword = await bcrypt.hash(password, 10);

    // Create New User
    const user = new User({ name,email,password:hashedpassword,role,cartdata });
    await user.save();
     
    const data = {
      user:{id:user.id}
    }
    const token = jwt.sign(data,process.env.JWT_KEY)
     
    res.status(200).json({ message: "User Registered Successfully",token });
  } catch (error) {
    console.error("Error in registerUser:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



export const LoginUser = async(req,res)=>{
 try {
    const {email,password,cartdata} = req.body;
    const user = await User.findOne({email})
    if (!user) {
      return res.status(400).json({message:"Invalid email and password"})
    }

    const isMatch = await bcrypt.compare(password,user.password)

    if (isMatch) {
      const data ={user:{id:user.id}}
    }
    if (!isMatch) {
      return res.status(400).json({message:"Invalid password"})
    }

    const token = jwt.sign({id:user._id,email:user.email,password:user.password,role:user.role,cartdata:user.cartdata},process.env.JWT_KEY , {expiresIn: "1h"})
    res.status(200).json({message:"Login Successfully",token,user:{id:user.id,email:user.email,password:user.password,role:user.role,cartdata:user.cartdata}})
   
 } catch (error) {
     console.error("Login Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
 }
}