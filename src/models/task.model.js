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
    idUsuario : {
        type : Number,
        required : true
    }
});

const taskModel = mongoose.model("tasks", taskSchema);

export default taskModel;