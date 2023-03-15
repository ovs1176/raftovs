import jwt from "jsonwebtoken";
import PersonModel from "../models/Person.js";

var checkAdminAuth = async (req, res, next) => { 
    let token; 
    const { authorization } = req.headers; 
    if (authorization && authorization.startsWith('Bearer')) {
        try { 
            token = authorization.split(' ')[1];
            // verify token 
            const admin = jwt.verify(token, process.env.JWT_SECRET_KEY); 
            
            // Get user from token... 
            req.user = await PersonModel.findById(admin.personID).select("-password");
            next(); 
        } catch (error) {
            console.log(error);
            res.send({"status": "Failed" , "message" : "Unauthorized Admin"});
        }
    }
    if(!token){
        res.status(401).send({"status" : "failed", "message" : "Unauthorized Person, No Token. "}); 
    }
}



export default checkAdminAuth;