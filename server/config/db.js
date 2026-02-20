import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.ENV === "Development" ? process.env.DB_DEV_URL : process.env.DB_PROD_URL ;

export const connectDB = async () => {
    try{
        await mongoose.connect(url);
        console.log("Mongodb connected using mongoose",url);
    }catch(error){
        console.log("Error while connecting to db",error);
    }
}