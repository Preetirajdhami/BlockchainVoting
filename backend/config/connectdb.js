import mongoose from "mongoose";
import dotenv from "dotenv";


dotenv.config(); 

const connectDB = async () => {
    try{
        console.log(process.env.DATABASE_URL);
       const connectionInstance = await mongoose.connect(`${process.env.DATABASE_URL}/VotingSystem`);
      console.log(`MONGODB connected !! DB HOST: ${connectionInstance.connection.host}`);

    }
    catch(error){
        console.log("MONGO DB connection failed:  ",error);
        process.exit(1);
    }   
};

export default connectDB;
