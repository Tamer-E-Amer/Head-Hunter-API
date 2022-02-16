/**
 * @description acceptedCandidate router router for accepted Candidate CRUD operation
 */
 import express from 'express';
 import {verifyTokenAndAdmin} from '../middleWare/verifyToken.js';
import AcceptedCandidate from '../models/AcceptedCandidate.js';
 const router = express.Router();
  
 // new accepted candidate
 // only admin can make new accepted candidate
 router.post('/addAcceptedCandidate',verifyTokenAndAdmin,async(req,res)=>{
     const acceptedCandidate = new AcceptedCandidate(req.body);
     try {
         const savedAcceptedCandidate = await acceptedCandidate.save();
         res.status(200).json(savedAcceptedCandidate);
     } catch (error) {
         res.status(500).json(error);
     }
 })
 
// Update accepted Candidate 
// only for admins
 router.put('/editAcceptedCandidate/:jobId',verifyTokenAndAdmin,async(req,res)=>{
     try {
         
         const updatedAcceptedCandidate = await Interview.find(
             {jobId:req.params.id},
             {
                 $set:req.body,
             },
             {
                 new:true,
             });
             res.status(200).json(updatedAcceptedCandidate);
     } catch (error) {
         res.status(500).json(error)
     }
    
 })
 
 // delte accepted candidate 
 // only for admins
 router.delete('/deleteAcceptedCandidate/:Id',verifyTokenAndAdmin,async(req,res)=>{
     try {
         await AcceptedCandidate.findByIdAndDelete(req.params.Id);
         res.status(200).json("This record has beed delated");
     } catch (error) {
         res.status(500).json(error);
     }
 })
 
 // get all accepted candidates for specific job
 // only for admin
 router.get("/all/:jobId",verifyTokenAndAdmin,async(req,res)=>{
     try {
         const allAcceptedCandidate = await AcceptedCandidate.find({jobId: req.params.jobId});
         res.status(200).json(allAcceptedCandidate);
     } catch (error) {
         res.status(500).json(error);
     }
 });
 



  export default router;