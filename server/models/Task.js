import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Task name is required'],
        trim: true,  // remove spaces from the beginning and end of the string
        maxLength: [50, 'Task name cannot be more than 50 characters']
    },
    completed: {
        type: Boolean,
        default: false,
    }
})

export default mongoose.model("Task", TaskSchema);