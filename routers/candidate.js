/**
 * @description candidate router for Candidate CRUD operation
 */
 import express from 'express';
 import { verifyTokenandAutherization,verifyTokenAndAdmin } from '../middleWare/verifyToken.js';
import Candidate from '../models/Candidate.js';
 
 const router = express.Router();
 
// create new Candidate
router.post('/createCandidate',verifyTokenandAutherization,async(req,res)=>{
    const newCandidate = new Candidate(req.body);
    try {
        const savedCandidate = await newCandidate.save();
        res.status(200).json(savedCandidate);
    } catch (error) {
        res.status(500).json(error);
    }
})

// // Update Candidate
router.put('/editCandidate/:id',verifyTokenandAutherization,async(req,res)=>{
    try {
        
        const updatedCandidate = await Candidate.findByIdAndUpdate(
            req.params.id,
            {
                $set:req.body,
            },
            {
                new:true,
            });
            res.status(200).json(updatedCandidate);
    } catch (error) {
        res.status(500).json(error)
    }
   
})

// // //delte Candidate

router.delete('/deleteCandidate/:Id',verifyTokenAndAdmin,async(req,res)=>{
    try {
        await Candidate.findByIdAndDelete(req.params.Id);
        res.status(200).json("Candidate has been deleted");
    } catch (error) {
        res.status(500).json(error);
    }
})

// // get all Candidates
router.get("/allCandidates",verifyTokenAndAdmin,async(req,res)=>{
    const category = req.query.category;
    try {
        const candidates = category
                                    ?await Candidate.find({
                                        degree:{
                                            $in:[category]
                                        },
                                    }) 
                                    :await Candidate.find();
        res.status(200).json(candidates);
    } catch (error) {
        res.status(500).json(error);
    }
});

//get a candidate
router.get("/find/:id",verifyTokenAndAdmin,async(req,res)=>{
    try {
        const candidate = await Candidate.findOne(req.params.id);
        res.status(200).json(candidate);
    } catch (error) {
        res.status(500).json(error);
    }
})
 export default router;