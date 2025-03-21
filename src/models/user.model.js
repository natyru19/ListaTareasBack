import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    tasks: {
        type: [String]
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    }
});

const UserModel = mongoose.model("users", userSchema);

export default UserModel;