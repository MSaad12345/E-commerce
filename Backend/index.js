import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import connectDB from './Config/db.js'
import router from './router/routes.js'
import multer from 'multer'
import path from 'path'



const app = express();
const PORT =process.env.PORT

// MiddleWare
app.use(express.json())
app.use(cors())
 
connectDB();

// Routes
app.use("/api/product",router);

app.get('/',(req,res)=>{
    res.send("Backend is Running")
})

const storage = multer.diskStorage({
    destination :'./Upload/images',
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
const Upload = multer({storage:storage});

app.use('/images',express.static("Upload/images"))
app.post('/upload',Upload.single("product"),(req,res)=>{
    res.json({
        massege:"Image Uploaded Successfully",
        image_url:` http://localhost:${PORT}/images/${req.file.filename}`
    })
})

app.listen(PORT,()=> {
    console.log(`Server is Running on http://localhost:${PORT}`)
})