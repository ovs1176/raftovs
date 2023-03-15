import express from "express";
const router = express.Router();
import PersonController from "../controller/personController.js";
import checkAdminAuth from "../middleware/adminAuth.js";

// Route level Middleware - to protect Route
router.use("/approveBlog", checkAdminAuth);
router.use("/denyBlog", checkAdminAuth);

// Public Routes
router.get("/allPersonDetail", PersonController.allPersonDetail);
router.post("/addPerson", PersonController.addPerson);
router.post("/loginPerson", PersonController.loginPerson);
router.post("/approveBlog", PersonController.approveBlog);
router.post("/denyBlog", PersonController.denyBlog);


export default router;