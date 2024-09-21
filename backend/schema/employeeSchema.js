import mongoose from "mongoose";


const employeeSchema=new mongoose.Schema({
    name:String,
    email:{
        type:String,
        required:true
    },
    mobileNo:String,
    designation:String,
    gender:String,
    courses:[],
    image:String      //for this we store using string but in real project we use cloudnary

},{timestamps:true})

export const Employee=mongoose.model("Employee",employeeSchema)