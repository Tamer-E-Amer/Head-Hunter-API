/**
 * @description Candidate model that hold the Candidate schema 
 */
 import mongoose from 'mongoose';

 const candidateSchema = mongoose.Schema({
     userId         :{type:String,  required:true},
     //Personal Info
     firstName      :{type:String,  required:true},
     lastName       :{type:String,  required:true},
     gender         :{type:String,  required:true},
     birthDate      :{type:Date,    required:true},
     image          :{type:String,  required:true},

     //Contact Info
     telephone      :{type:Object,  required:true},     // object of different types of phones contact ie. mob, home , etc
     email          :{type:String,  required:true},
     social         :{type:Object},                     // object of different types of social media
     skybe          :{type:String},
     ITRepo         :{type:Object},                     // object of different repositiory such as github, behance ,...

     // Educational Info
     degree         :{type:Array,   required:true},     // array of degree names
     degreeDetail   :{type:Array,   required:true},     // aray of degrees objects

     // Training and courses details
     trainAndCourse :{type:Array},                      // array of training objects
     
     // Wrok experience ifo
     experience     :{type:Array,   required:true}      // array of experience objects
 },
 {timeStamps:true}
 );
 
 export default mongoose.model("Candidate",candidateSchema)