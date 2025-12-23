import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export async function mongoDBConnection(): Promise<void> {
    try {
        const mongoUri = process.env.MONGODB_URI;  
        if (!mongoUri) {
            throw new Error("MONGODB_URI is not defined in .env"); // Error if MongoDB URI is not defined
        }
        await mongoose.connect(mongoUri);
        console.log("MongoDB connected");
    } catch (err) {
        console.error("MongoDB connection error:", err);
        throw err;
    }
}
