import mongoose, { Schema } from "mongoose";


const userSchema = new Schema({
    username:{
     type:String,
     required:[true,"Username is required"],
     unique: [true,'username already exists'],
    },
    firstname:{
        type: String,
        required: [true,"First name is required"]
    },
    lastname:{
        type: String,
        required: [true,"Last name is required"]
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    }
})



export const User = mongoose.model("User", userSchema)