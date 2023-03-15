import dotenv from "dotenv";
dotenv.config();
import  express from "express";
import  cors from "cors";
import personRoutes from "./routes/personRoutes.js";
import blogsRoutes from "./routes/blogsRoutes.js";
import mongoose from "mongoose";

const app = express();
const port = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

// CORs Policy
app.use(cors())

// for handling deprication warning
mongoose.set('strictQuery', false);

// Database connection
try {
    const DB_OPTIONS = {
        dbName : "Blogs_Website"
    }
    await mongoose.connect(DATABASE_URL, DB_OPTIONS); 
    console.log(`connected Successfully to ${DB_OPTIONS.dbName}`); 
} catch (error) { 
    console.log(error); 
} 
// JSON
app.use(express.json()) 

// loading routes here
app.use("/api/person/", personRoutes); 
app.use("/api/blogs/", blogsRoutes); 
 
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})





