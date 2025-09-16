import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    done: {
        type: Boolean,
        default: false
    },
    userId: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "users",
        default : new mongoose.Types.ObjectId("67d97629a600e26adb50026b")
    }
});

const taskModel = mongoose.model("tasks", taskSchema);

export default taskModel;