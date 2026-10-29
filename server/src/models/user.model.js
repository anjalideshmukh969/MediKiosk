import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 2, 
            maxlength: 80
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, "Invalid email"],
        },
        password: {
            type: String,
            required: true,
            select: false,

        },
        role: {
            type: String,
            enum: ["doctor", "patient"],
        },
        phone: {
            type: String,
            trim: true,
            match: [/^[6-9]\d{9}$/, "Invalid Indian mobile number"],
            trim: true
        },
        preferredLanguage: {
            type: String,
            enum: ["en", "hi", "mr"],
            default: "en",
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    }, { timestamps: true },
)
export default mongoose.model("User", userSchema);