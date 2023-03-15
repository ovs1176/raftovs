import mongoose from "mongoose";


// defining Schema
const personSchema = mongoose.Schema({
    name : {type: String, required : true, trim: true},
    email : {type: String, required : true, trim: true},
    password : {type: String, required : true, trim: true},
    mobile : {type : String, required : true, trim : true},
    role : {type : String, required: true, trim: true},
    prevPublishedBlogsId : [{
        type : String,
        trim : true
    }],
    prevApprovedBlogsId : [{
        type : String,
        trim : true
    }],
    prevDeclinedBlogsId : [{
        type : String,
        trim : true
    }],
})


// defineing model
const PersonModel = mongoose.model("Person", personSchema);

export default PersonModel;