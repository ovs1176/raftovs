import PersonModel from "../models/Person.js";
import BlogModel from "../models/Blog.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

class personController {
    // for getting all person whether User or Admin...
    static allPersonDetail = async (req, res) => {
        const persons = await PersonModel.find();
        res.send(persons);
    }

    static addPerson = async (req, res) => {
        try {
            const personObject = await PersonModel.findOne({ email: req.body.email });
            if (personObject) {
                res.send("there is already a person with the same email.")
            }
            else {
                // generating salt
                const salt = await bcrypt.genSalt(10);
                // making hash password using salt...
                const hashPassword = await bcrypt.hash(req.body.password, salt);
                const person = new PersonModel({
                    name: req.body.name,
                    email: req.body.email,
                    password: hashPassword,
                    mobile: req.body.mobile,
                    role: req.body.role
                });
                const savedPerson = await person.save();
                res.send(savedPerson)
            }
        } catch (error) {
            res.send({ "message": error.message });
        }
    }

    static loginPerson = async (req, res) => {
        const personObject = await PersonModel.findOne({ email: req.body.email });
        if (personObject) {
            if (personObject.role === req.body.role) {
                const result = await bcrypt.compare(req.body.password, personObject.password);
                if (result) {
                    // Generating JWT Token 
                    const token = jwt.sign({ personID: personObject._id }, process.env.JWT_SECRET_KEY, { expiresIn: '15m' });
                    res.send({ "message": "Successfully Login", "Logged In as a ": personObject.role, token });
                }
                else {
                    res.send({ "message": "Login Failed.... password does not matched..." });
                }
            }
            else {
                res.send({ "message": "Login Failed.... email matched but role does not matched..." })
            }
        }
        else {
            res.send({ "message": "Login Failed.... email does not matched..." })
        }
    }

    // for approving the blog (only for admin)
    static approveBlog = async (req, res) => {
        // saving changes in the blogs Table...
        const savedBlogDetails = await BlogModel.findByIdAndUpdate(req.body.blogId,
            {
                $set: {
                    date_published: Date.now(),
                    reviewed_by: req.body.adminId,
                    isActive: true,
                    isReviewed: true
                }
            })

        // saving changes in the Person Table...
        const savedPersonDetails = await PersonModel.findByIdAndUpdate(req.user._id,
            {
                $push: {
                    prevApprovedBlogsId: req.body.blogId
                }
            })

        res.send({ "message": "Blog is Approved successfully...", savedBlogDetails, savedPersonDetails });
    }


    static denyBlog = async (req, res) => {
        // saving changes in the blogs Table...
        const savedBlogDetails = await BlogModel.findByIdAndUpdate(req.body.blogId,
            {
                $set: {
                    reviewed_by: req.user._id,
                    isActive: false,
                    isReviewed: true
                }
            })

        // saving changes in the Person Table...
        const savedPersonDetails = await PersonModel.findByIdAndUpdate(req.user._id,
            {
                $push: {
                    prevDeclinedBlogsId: req.body.blogId
                }
            })

        res.send({ "message": `Blog is successfully declined... `, savedBlogDetails, savedPersonDetails });
    }

}

export default personController;