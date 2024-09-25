import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    date_of_birth: {
        type: Date,
        required: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    mobile: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    photo: {
        type: String,
        required: false, // Can be optional depending on your logic
    },
    is_verified: {
        type: Boolean,
        default: false
    },
    roles: {
        type: [String],
        enum: ["user", "admin"],
        default: ["user"]
    },
}, {
    timestamps: true // Automatically creates 'createdAt' and 'updatedAt' fields
});

// Model
const UserModel = mongoose.model("User", userSchema);

export default UserModel;
