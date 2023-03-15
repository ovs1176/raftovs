import BlogsModel from "../models/Blog.js";


class blogsController {
    // for getting all person whether User or Admin...
        static allBlogsDetail = async (req, res) => {
            // console.log("req.params :", req.query);
            let page = req.query.page ? req.query.page: 1;
            let pageSize = req.query.pageSize ? req.query.pageSize: 5;
            let sort = req.query.sort ? req.query.sort: 1;
            const blogs = await BlogsModel.find({isDeleted : false, isActive : true})
            .sort({ title: sort })
            .skip((page - 1) * pageSize)
            .limit(pageSize);

            res.send(blogs);
        }

        static addBlog = async (req, res) => { 
            const blogToSave = BlogsModel(req.body);
            try {
                if(blogToSave){
                    blogToSave.created_by = req.user._id;
                    
                    // console.log("\n\n++++ blog to save +++++\n\n", blogToSave);
                    const savedBlog = await blogToSave.save();
                    
                    res.send({"message" : "Successfully saved data...", savedBlog})
                } else{
                    res.send({"message" : "no any data received from the client side"});
                }
            } catch (error) {
                res.send({"message" : "Some error happened in add blogs", error});
            }
        }
}

export default blogsController;