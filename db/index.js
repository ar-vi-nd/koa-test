import mongoose from "mongoose";
const connectDB = async ()=>{
    try{
        const connectionInstance = await mongoose.connect(`mongodb://localhost:27017/trackier`)
        console.log(`Mongoose connected !! DB HOST: ${connectionInstance}`)
    }catch(error){
        console.log("MongoDb connection error ",error)
        process.exit(1)
    }
}

export default connectDB;