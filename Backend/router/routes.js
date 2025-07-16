import express from "express";

import { getAllProduct,getMenProduct,addtoCart,removeFromCart,FetchUser,getNewProduct,AddProduct,removeProduct,UpdateProduct } from "../controllers/ProductControllers.js";
import { RegisterUser,LoginUser } from "../controllers/AuthControllers.js";

const router = express.Router();

// Product Routes
router.get('/',getAllProduct)
router.post('/',AddProduct)
router.put('/:id',UpdateProduct)
router.delete('/:id',removeProduct)
router.get("/men",getMenProduct)
router.get("/newcollection",getNewProduct)
router.post("/addtoCart",FetchUser,addtoCart)
router.post("/removeFromCart",FetchUser,removeFromCart)


// User Routes
router.post('/Register',RegisterUser)
router.post("/Login",LoginUser)

export default router;