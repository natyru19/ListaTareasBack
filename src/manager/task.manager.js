import taskModel from "../models/task.model.js";

class TaskManager {

    async getAllTasks() {
        const tasks = await taskModel.find();
        return tasks;
    }

    async getTasksByCompletion(done){
        const tasks = await taskModel.find({done})
        return tasks
    }
    
    async getTasksByUserId(userId){
        const tasks = await taskModel.find({userId})
        return tasks
    }

    async getTasksByUserAndCompletion(userId, done){
        const tasks = await taskModel.find({userId, done})
        return tasks
    }

    async getTaskByID(id) {
        const task = await taskModel.findById(id);
        return task;
    }

    //Busca tareas por descripción para un usuario
    async getUsersTasksByDescription(desc, userId){
        const task = await taskModel.find({description : desc, userId });
        return task
    }

    async addTask(newTask) {
        try {
            const task = await taskModel.create(newTask);
            return task;
        } catch (error) {
            throw error;
        }
    }

    async deleteById(id){
        try {
            const task = await taskModel.findByIdAndDelete(id)
            return task;
        } catch (error) {
            throw error;
        }
    }

    async updateTask(id, updateData){
        try {
            const task = await taskModel.findByIdAndUpdate(id, {description : updateData.description, done : updateData.done, priority : updateData.priority}, {new:true})
            return task
        } catch (error) {
            throw error;
        }
    }
}

export default TaskManager;