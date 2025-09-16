import taskModel from "../models/task.model.js";

class TaskManager {

    async getAllTasks() {
        const tasks = await taskModel.find();
        return tasks;
    }

    async getTaskByID(id) {
        const task = await taskModel.findById(id);
        return task;
    }

    //Busca tareas por descripción para un usuario
    async getUsersTasksByDescription(desc, idUsuario){
        const task = await taskModel.find({description : desc, idUsuario });
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
            const task = await taskModel.findByIdAndUpdate(id, {description : updateData.description, done : updateData.done}, {new:true})
            return task
        } catch (error) {
            throw error;
        }
    }
}

export default TaskManager;