/**
 * @description applying router router for applying CRUD operation
 */
 import express from 'express';
 import { verifyTokenandAutherization,verifyTokenAndAdmin, verifyTokenAndCandidate} from '../middleWare/verifyToken.js';
 import Applying from '../models/Applying.js';
  
  const router = express.Router();
  
 // applying for a job
 // only candidates can apply for a job
 router.post('/applyForAjob',verifyTokenAndCandidate,async(req,res)=>{
     const newApply = new Applying(req.body);
     try {
         const savedApply = await newApply.save();
         res.status(200).json(savedApply);
     } catch (error) {
         res.status(500).json(error);
     }
 })
 
// Update job posting
 router.put('/editYourJobApply/:jobId',verifyTokenAndCandidate,async(req,res)=>{
     try {
         
         const uppdatedJobApply = await Applying.findOne(
             {jobId:req.params.jobId},
             {
                 $set:req.body,
             },
             {
                 new:true,
             });
             res.status(200).json(uppdatedJobApply);
     } catch (error) {
         res.status(500).json(error)
     }
    
 })
 
 // delte Job apply
 // only admin can delete Job apply
 router.delete('/deleteJobApply/:Id',verifyTokenAndAdmin,async(req,res)=>{
     try {
         await Applying.findByIdAndDelete(req.params.Id);
         res.status(200).json("Job Apply has beed delated");
     } catch (error) {
         res.status(500).json(error);
     }
 })
 
 // get all Job applys for a candidate
 router.get("/myJobsApply/:candidateId",verifyTokenAndCandidate,async(req,res)=>{
     try {
         const jobApplyings = await Applying.find({candidateId: req.params.candidateId});
         res.status(200).json(jobApplyings);
     } catch (error) {
         res.status(500).json(error);
     }
 });
 

 // get all applys for specific job for a admin
 router.get("/jobsApllying",verifyTokenAndAdmin,async(req,res)=>{
     const jobId = req.query.jobId;
     try {
         const jobApplyings = jobId 
                                ? await Applying.find({jobId:jobId}) // candidate for specific job
                                : await Applying.find();            // candidates for all jobs
         res.status(200).json(jobApplyings);
     } catch (error) {
         res.status(500).json(error);
     }
 });
 

  export default router;