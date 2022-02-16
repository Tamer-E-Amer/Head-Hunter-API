/**
 * @description this is a middleware for verifying token
 */
import jwt from 'jsonwebtoken';

// verify token
const verifyToken = (req,res,next)=>{
    const reqHeader = req.headers.token;
    if(!reqHeader){
        res.status(401).json("you ar not authenticated");
    }else{
        const token = reqHeader.split(" ")[1];
        jwt.verify(token,process.env.TOKEN_SECRET_KEY,(error,tokenData)=>{
           if(error) res.status(403).json("Token is Invalid") 
           req.user = tokenData;
           next();
        })
    }
    
}

// verify token and autherization
const verifyTokenandAutherization = (req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        }else{
            res.status(403).json("You are not allowed to do that");
        }
    });
}

// verify token and Admin
const verifyTokenAndAdmin = (req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.isAdmin){
            next();
        }else{
            res.json(403).json("You are not allowed to do that");
        }
    });
}

// verify token and Candidate
const verifyTokenAndCandidate = (req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.userType == "candidate"){
            next();
        }else{
            res.json(403).json("You are not allowed to do that");
        }
    });
}
// verify token and Admin for job posting
const verifyTokenAndAdminForJobPosting = (req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.isAdmin || req.user.userType == "employer" ){
            next();
        }else{
            res.json(403).json("You are not allowed to do that");
        }
    });
}

export {verifyToken, verifyTokenandAutherization,verifyTokenAndAdmin,verifyTokenAndAdminForJobPosting,verifyTokenAndCandidate};