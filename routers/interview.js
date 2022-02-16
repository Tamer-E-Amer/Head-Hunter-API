/**
 * @description interview router router for interviews CRUD operation
 */
 import express from 'express';
 import {verifyTokenAndAdmin, verifyTokenAndCandidate} from '../middleWare/verifyToken.js';
 import Interview from '../models/Interview.js' 
 const router = express.Router();
  
 // make an interview
 // only admin can make interview
 router.post('/makeInterview',verifyTokenAndAdmin,async(req,res)=>{
     const interview = new Interview(req.body);
     try {
         const savedInterview = await interview.save();
         res.status(200).json(savedInterview);
     } catch (error) {
         res.status(500).json(error);
     }
 })
 
// Update interview 
// only for admins
 router.put('/editInterview/:id',verifyTokenAndAdmin,async(req,res)=>{
     try {
         
         const updatedInterview = await Interview.findByIdAndUpdate(
             req.params.id,
             {
                 $set:req.body,
             },
             {
                 new:true,
             });
             res.status(200).json(updatedInterview);
     } catch (error) {
         res.status(500).json(error)
     }
    
 })
 
 // delte Interview
 // only for admins
 router.delete('/deleteInterview/:Id',verifyTokenAndAdmin,async(req,res)=>{
     try {
         await Interview.findByIdAndDelete(req.params.Id);
         res.status(200).json("Interview has beed delated");
     } catch (error) {
         res.status(500).json(error);
     }
 })
 
 // get all Interview for a candidate
 router.get("/myInterviews/:candidateId",verifyTokenAndCandidate,async(req,res)=>{
     try {
         const myInterviews = await Interview.find({candidateId: req.params.candidateId});
         res.status(200).json(myInterviews);
     } catch (error) {
         res.status(500).json(error);
     }
 });
 

 // get all Interviews for specific job for a admin
 router.get("/allInterviews",verifyTokenAndAdmin,async(req,res)=>{
     const jobId = req.query.jobId;
     try {
         const allInterviews = jobId 
                                ? await Interview.find({jobId:jobId}) // interviews for specific job
                                : await Interview.find();            // interviews for all jobs
         res.status(200).json(allInterviews);
     } catch (error) {
         res.status(500).json(error);
     }
 });
 

  export default router;