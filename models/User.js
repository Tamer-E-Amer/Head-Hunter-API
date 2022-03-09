/**
 * @description User model that hold the user schema 
 */

import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    userName    :{type:String,      required:true,      unique:true},
    password    :{type:String,      required:true},
    email       :{type:String,      required:true,      unique:true},
    userType    :{type:String,      required:true,      default:"candidate"},
    isAdmin     :{type:Boolean,     required:true,      default:false},
},
{timeStamps:true}
);

export default mongoose.model("User",userSchema);