/**
 * @description Employer model that hold the Employer schema 
 */
import mongoose from 'mongoose';

const employerSchema = mongoose.Schema({
    userId          :{type:String,  required:true},
    name            :{type:String,  required:true,  unique:true},
    about           :{type:String,  required:true},
    address         :{type:Object,  required:true},
    businessField   :{type:Array,   required:true},
    foundedIn       :{type:String,  default:"N/A"},
    noOfEmployees   :{type:Number,  default:"N/A"},
    logo            :{type:String}
},
{timeStamps:true}
);

export default mongoose.model("Employer",employerSchema)