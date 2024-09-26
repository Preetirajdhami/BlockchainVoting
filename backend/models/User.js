import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  password_confirmation: {
    type: String, // You can store this if needed, but generally, only the password is stored after hashing
    trim: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  mobile: {
    type: String,
    required: true,
    trim: true,
    match: /^\d{10}$/, // Ensure mobile is 10 digits as per your frontend validation
  },
  photo: {
    type: String, // Typically a URL or path to the uploaded image file
    required: true,
  },
  is_verified: {
    type: Boolean,
    default: false,
  },
  roles: {
    type: [String],
    enum: ["user", "admin"],
    default: ["user"],
  },
});

// Create the model
const UserModel = mongoose.model("user", userSchema);

export default UserModel;
