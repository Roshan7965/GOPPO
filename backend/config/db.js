import mongoose from "mongoose";

const connectdb=async()=>{
    try {
        await mongoose.connect(process.env.MONGODBURL);
        console.log("DB connect"); 
    } catch (error) {
        console.log("DB error");
    }
}

export default connectdb;