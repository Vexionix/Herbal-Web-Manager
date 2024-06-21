import mongoose from "mongoose";
import Collection from './collectionModel.js';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    description:{type:String},
    liked_photos: [{
        _id: String,
    }],
    collections: {_id: String},
    profile_img: { type: String },
    email:{type:String,required:true},
});

const User = mongoose.model("User", userSchema);

export default User;