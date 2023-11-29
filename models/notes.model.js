import mongoose from "mongoose";
import { Schema } from "mongoose";

const notesSchema = new Schema({
    username:{
     type: Schema.Types.String,
     ref:"User",
     required:true
    },
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    }
},{
    timestamps:true
})



export const Notes = mongoose.model("Notes", notesSchema);

