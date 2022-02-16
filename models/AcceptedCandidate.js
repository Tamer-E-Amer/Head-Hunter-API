/**
 * @description AcceptedCandidate model that hold the acceptedCandidate schema 
 */
 import mongoose from 'mongoose';

 const acceptedCandidateSchema = mongoose.Schema({
     jobId      :{type:String,  required:true}, 
     candidates :{type:Array,   required:true}, // array of accepted candidates   
     
 },
 {timeStamps:true}
 );
 
 export default mongoose.model("AcceptedCandidate",acceptedCandidateSchema)