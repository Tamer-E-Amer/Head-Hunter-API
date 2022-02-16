/////////////////////////////////// importing Pakages //////////////////////////
import express from 'express';
import cors from 'cors';       
import dotenv from 'dotenv';        // Secret keys within .env file
import mongoose from 'mongoose';    // Database operations
//routers
import { userRouter,authRouter, employerRouter, candidateRouter, jobPositionRouter, applyingRouter, interviewRouter } from './routers/index.js';
///////////////////////////////////////////////////////////////////////////////
//initiating app
const app = express();
app.use(express.json());

//using dotenv
dotenv.config();
//Port and listening function
const PORT=5000;

app.listen(process.env.SERVER_PORT || PORT,()=>{
    console.log(`Server is running on Port ${process.env.SERVER_PORT ? process.env.SERVER_PORT :PORT}`);
})

//connecting with database
mongoose.connect(process.env.DATABASE_CONNECTION)
        .then(()=>{console.log("Successfull connection with mongoo DB")})
        .catch((error)=>{console.log(error)});
// using packages
app.use(cors());
// using routers
app.use('/api/auth',authRouter);
app.use('/api/user',userRouter);
app.use('/api/employer',employerRouter);
app.use('/api/candidate',candidateRouter);
app.use('/api/jobPosition',jobPositionRouter);
app.use('/api/applying',applyingRouter);
app.use('/api/interview',interviewRouter);
app.use('/api/acceptedCandidate',interviewRouter);