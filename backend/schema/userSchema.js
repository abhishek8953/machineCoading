import mongoose, { modelNames } from "mongoose";


const userSchema=new mongoose.Schema({
    username:{
        type:String,
        unique:true
    },
    password:String
})

export const User=mongoose.model("User",userSchema)