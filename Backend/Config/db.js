import dotenv from 'dotenv'
dotenv.config()
import mongoose from "mongoose";


const connectDB = async()=>{
try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log("MONGODB CONNECTED SECCECSSFUULY")
} catch (error) {
    console.error("Error in Connecting MongoDB:", error.message);

}
}

export default connectDB;