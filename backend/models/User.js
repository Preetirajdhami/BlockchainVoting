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
    type: String, 
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
    match: /^\d{10}$/, 
  },
  photo: {
    type: String, 
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


const UserModel = mongoose.model("user", userSchema);

export default UserModel;
