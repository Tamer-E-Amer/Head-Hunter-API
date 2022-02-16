/**
 * @description employer router for Employer CRUD operation
 */
import express from 'express';
import { verifyTokenandAutherization,verifyTokenAndAdmin } from '../middleWare/verifyToken.js';
import Employer from '../models/Employer.js';

const router = express.Router();

// create new employer
router.post('/createEmployer',verifyTokenandAutherization,async(req,res)=>{
    const newEmployer = new Employer(req.body);
    try {
        const savedEmployer = await newEmployer.save();
        res.status(200).json(savedEmployer);
    } catch (error) {
        res.status(500).json(error);
    }
})

// Update Employer
router.put('/editEmployer/:id',verifyTokenandAutherization,async(req,res)=>{
    try {
        
        const updatedEmployer = await Employer.findByIdAndUpdate(
            req.params.id,
            {
                $set:req.body,
            },
            {
                new:true,
            });
            res.status(200).json(updatedEmployer);
    } catch (error) {
        res.status(500).json(error)
    }
   
})

// //delte Employer

router.delete('/deleteEmployer/:Id',verifyTokenAndAdmin,async(req,res)=>{
    try {
        await Employer.findByIdAndDelete(req.params.Id);
        res.status(200).json("Employer has been deleted");
    } catch (error) {
        res.status(500).json(error);
    }
})

// get all users
router.get("/allEmployers",verifyTokenAndAdmin,async(req,res)=>{
    try {
        const allEmployers = await Employer.find();
        res.status(200).json(allEmployers);
    } catch (error) {
        res.status(500).json(error);
    }
});

// //get an Employer
router.get("/find/:id",verifyTokenAndAdmin,async(req,res)=>{
    try {
        const employer = await Employer.findOne(req.params.id);
        res.status(200).json(employer);
    } catch (error) {
        res.status(500).json(error);
    }
})
export default router;