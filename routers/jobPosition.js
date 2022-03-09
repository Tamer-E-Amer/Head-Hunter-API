/**
 * @description jobPosition router for jobPosition CRUD operation
 */
import express from 'express';
import { verifyToken, verifyTokenAndAdmin, verifyTokenAndAdminForJobPosting } from '../middleWare/verifyToken.js';
import JobPosition from '../models/JobPosition.js';
 
 const router = express.Router();
 
// create new Job Psting
// only admins or employers can make job posting
router.post('/newJobPosting',verifyTokenAndAdminForJobPosting,async(req,res)=>{
    const newJobPosting = new JobPosition(req.body);
    try {
        const savedJobPosting = await newJobPosting.save();
        res.status(201).json(savedJobPosting);
    } catch (error) {
        res.status(500).json(error);
    }
})

// Update job posting
// only admins and employers can update job posting
router.put('/editJobPsting/:id',verifyTokenAndAdminForJobPosting,async(req,res)=>{
    try {
        
        const updatedJobPosting = await JobPosition.findByIdAndUpdate(
            req.params.id,
            {
                $set:req.body,
            },
            {
                new:true,
            });
            res.status(200).json(updatedJobPosting);
    } catch (error) {
        res.status(500).json(error)
    }
   
})

//delte Job posting
// only admin can delte Job posting
router.delete('/deleteJobPosting/:Id',verifyTokenAndAdmin,async(req,res)=>{
    try {
        await JobPosition.findByIdAndDelete(req.params.Id);
        res.status(200).json("Job Posting has beed delated");
    } catch (error) {
        res.status(500).json(error);
    }
})

// get all Job postings for admin
router.get("/allJobPostings",verifyTokenAndAdmin,async(req,res)=>{
    const category = req.query.category;
    try {
        const jobPositings = category
                                    ?await JobPosition.find({
                                        jobField:{
                                            $in:[category]
                                        },
                                    }) 
                                    :await JobPosition.find();
        res.status(200).json(jobPositings);
    } catch (error) {
        res.status(500).json(error);
    }
});

// get all Job postings for emplyer
router.get("/allJobPostings/employer/:userId",verifyTokenAndAdminForJobPosting,async(req,res)=>{
    try {
        const jobPositings = await JobPosition.find({userId:req.params.userId});
        res.status(200).json(jobPositings);
    } catch (error) {
        res.status(500).json(error);
    }
});

// //get certain job posting
router.get("/find/:id",verifyTokenAndAdmin,async(req,res)=>{
    try {
        const jobPosting = await JobPosition.findOne(req.params.id);
        res.status(200).json(jobPosting);
    } catch (error) {
        res.status(500).json(error);
    }
})

// get all job posting for candidates
router.get("/find/:category",async(req,res)=>{
    try {
        const jobPosting = await JobPosition.find(req.params.category);
        res.status(200).json(jobPosting);
    } catch (error) {
        res.status(500).json(error);
    }
})
 export default router;