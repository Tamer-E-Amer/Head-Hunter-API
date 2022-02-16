/**
 * @description InterView model that hold the interview schema 
 */
 import mongoose from 'mongoose';

 const interviewSchema = mongoose.Schema({
     userId                     :{type:String,  required:true}, 
     interviewDate              :{type:Date,    required:true},    
     jobId                      :{type:String,  required:true}, 
     candidateId                :{type:Array,   required:true},      // array of codidates for this interview
     candidatesForNextInterview :{type:Array,   required:true},      // array of codidates for next interview
     interviewer                :{type:String}, 
 },
 {timeStamps:true}
 );
 
 export default mongoose.model("Interview",interviewSchema)