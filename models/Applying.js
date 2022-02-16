/**
 * @description Applying model that hold the Applying schema 
 */
 import mongoose from 'mongoose';

 const applyingSchema = mongoose.Schema({
     applyingDate   :{type:Date,    required:true},                    
     candidateId    :{type:String,  required:true},
     jobId          :{type:String,   required:true}, 
 },
 {timeStamps:true}
 );
 
 export default mongoose.model("Applying",applyingSchema)