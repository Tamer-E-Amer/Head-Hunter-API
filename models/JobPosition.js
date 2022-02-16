/**
 * @description JobPosition model that hold the JobPsition schema 
 */
 import mongoose from 'mongoose';

 const jobPositionSchema = mongoose.Schema({
     userId     :{type:String,  required:true},
     title      :{type:String,  required:true},
     descriptio :{type:String,  required:true},
     yourRoles  :{type:Array,   required:true},                     // array of list of job roles
     weOffer    :{type:Array,   required:true},                     // array of list of company offers
     salary     :{type:String,  default:"N/A"},
     jobField   :{type:Array,   required:true,    default:['IT']},  // array of job field
     company    :{type:String,  required:true},
     place      :{type:Object,  required:true},                     // address object such as country city street and postal code
     status     :{type:String,  default:"open"},
     validTo    :{type:Date,    required:true},                     // object of different repositiory such as github, behance ,...

     
 },
 {timeStamps:true}
 );
 
 export default mongoose.model("JobPosition",jobPositionSchema)