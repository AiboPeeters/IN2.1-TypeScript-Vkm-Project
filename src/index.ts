import express, { Request, Response } from "express";
import { mongoDBConnection } from "./infrastructure/db/db";
import cors from "cors";
import VKMRoutes from "./application/routes/VKM.Routes";
import CourseRoutes from "./application/routes/Course.Routes"

// Create a new express application instance
const app = express();

// Middleware to parse JSON body
app.use(express.json());

// CORS middleware
app.use(cors());

// Set the network port
const port = 4600;
const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
    throw new Error("MONGODB_URI is not defined in .env");
}
// Connect to MongoDB 
mongoDBConnection()

// Define the root path with a greeting message
app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Welcome to the Express + TypeScript Server!" });
});

// VKM routes
app.use("/api/vkms", VKMRoutes);
app.use("/api/courses", CourseRoutes)

// Start the Express server
app.listen(port, () => {
    console.log(`The server is running at http://localhost:${port}`);
});
