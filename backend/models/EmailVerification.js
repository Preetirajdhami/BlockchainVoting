import mongoose from "mongoose";

//Defining Schema
 const emailVerificationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: true },
        otp: { type:String, required: true},
        createdAt: { type: Date, default: Date.now, expires: '15m'}

    });

    //model 
    const EmailVerificationModel = mongoose.model
    ("EmailVerification", emailVerificationSchema);

    export default EmailVerificationModel