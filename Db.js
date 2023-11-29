import mongoose from "mongoose";

const Connection = async ()=>{
 try {
await mongoose.connect(`${process.env.MONGODB_URI}`);
 console.log(`Mongodb connected Succesfully `)
 } catch (error) {
    console.log("MONGODB connection FAILED ", error);
    // process.exit(1)
 }
}

export default Connection; 