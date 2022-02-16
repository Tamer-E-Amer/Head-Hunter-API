/**
 * @description user router for user CRUD operations
 */
import express from "express";
import {verifyTokenAndAdmin, verifyTokenandAutherization } from "../middleWare/verifyToken.js";
import User from "../models/User.js";
const router = express.Router();

// Update User
router.put('/editUser/:id',verifyTokenandAutherization,async(req,res)=>{
    // if the user update his password then enrypt it
    if(req.body.password){
        req.body.password = CryptoJS.AES.encrypt(req.body.password,process.env.ENC_DEC_KEY).toString();
    }
    try {
        
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set:req.body,
            },
            {
                new:true,
            });
            res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json(error)
    }
   
})

//delte user

router.delete('/deleteUser/:Id',verifyTokenandAutherization,async(req,res)=>{
    try {
        await User.findByIdAndDelete(req.params.Id);
        res.status(200).json("User has been deleted");
    } catch (error) {
        res.status(500).json(error);
    }
})
// get all users
router.get("/allUsers",verifyTokenAndAdmin,async(req,res)=>{
    try {
        const allUsers = await User.find();
        res.status(200).json(allUsers);
    } catch (error) {
        res.status(500).json(error);
    }
});

//get User
router.get("/find/:id",verifyTokenandAutherization,async(req,res)=>{
    try {
        const user = await User.findOne(req.params.id);
        const {password, ...otherUserData} = user._doc;
        res.status(200).json(otherUserData);
    } catch (error) {
        res.status(500).json(error);
    }
})

export default router;