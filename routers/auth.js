/**
 * @description Autherization router for register and login
 */
import express from 'express';
import User from '../models/User.js';
import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';

const router = express.Router();

// User registeration
router.post('/register',async(req,res)=>{
    const user = new User({
        userName:req.body.userName,
        password:CryptoJS.AES.encrypt(req.body.password,process.env.ENC_DEC_KEY),
        email:req.body.email,
        userType:req.body.userType,
        isAdmin:req.body.isAdmin,
    });
    try {
        const newUser = await user.save();
        res.status(200).json(newUser)   ;
    } catch (error) {
        res.status(5000).json(error);
    }
});

// Login process
router.post('/login',async(req,res)=>{
    try {
        //get user
        const user = await User.findOne({userName:req.body.userName})
        //check user name
        !user && res.status(401).json("Wrong User Name");

        //check password
        const hashedPassword = CryptoJS.AES.decrypt(user.password,process.env.ENC_DEC_KEY);
        const originPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        originPassword != req.body.password && res.status(401).json("Wrong Password");
        //generate token
        const accessToken =jwt.sign({
            id      :user._id,
            isAdmin :user.isAdmin,
            userType:user.userType,
        },
        process.env.TOKEN_SECRET_KEY,
        {expiresIn:"3d"}
        )
        // send user data
        const {password, ...otherUserData} = user._doc;
        res.status(200).json({otherUserData,accessToken});
    } catch (error) {
        res.status(500).json(error);
    }
    
})
export default router