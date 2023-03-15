import express from "express";
const router = express.Router();
import BlogsController from "../controller/blogsController.js";
import checkPersonAuth from "../middleware/personAuth.js";

// Route level Middleware - to protect Route
router.use("/addBlog", checkPersonAuth);

// Public Routes
router.get("/allBlogsDetail", BlogsController.allBlogsDetail);
router.post("/addBlog", BlogsController.addBlog);


export default router;