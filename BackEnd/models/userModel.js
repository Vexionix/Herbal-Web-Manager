import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    liked_photos: { type: Number, default: 0 },
    userType: { type: String, default: 'user' }
});

const User = mongoose.model("User", userSchema);

export default User;