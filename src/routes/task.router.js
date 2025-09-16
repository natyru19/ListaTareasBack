import { Router } from "express";
import TaskManager from "../manager/task.manager.js";

const taskRouter = Router();
const taskManager = new TaskManager();


taskRouter.get("/", async (req, res) => {    
    try {
        const {id} = req.query;
        if(id){
            const task = await taskManager.getTaskByID(id);
            if(task.length>0){
                return res.status(200).json({data: task});
            }
            return res.status(404).json({data: []});
        }
        const tasks = await taskManager.getAllTasks();        
        if(tasks.length>0){
            return res.status(200).json({data: tasks});
        }
        return res.status(404).json({data: []});
    } catch (error) {
        return res.status(500).json({error: error.message});        
    }

});

taskRouter.post("/", async (req, res) => {
    try {
        const newTask = req.body;        

        if(!newTask.description || newTask.description=="" || typeof(newTask.description)!= "string"){
            return res.status(400).json({message: "Falta agregar la descripción"});
        }

        const createTask = await taskManager.addTask(newTask);

        if(createTask){
            return res.status(201).json({message: "Tarea agregada", data: createTask});
        }
        return res.status(400).json({message: "Error al agregar la tarea", data: null});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
});

taskRouter.delete("/", async (req, res) => {
    const {id} = req.query;    

    const task = await taskManager.getTaskByID(id);
    if(task){
        let deleted = await taskManager.deleteById(id);
        return res.status(200).json({message: "Se eliminó la tarea correctamente", data: deleted});
    }
    return res.status(404).json({message: "No se encontró la tarea"});
})

taskRouter.put("/", async (req, res) => {
    try {
        const {id} = req.query;
        if(id==undefined){
            return res.status(400).json({message: "BAD REQUEST"});
        }

        const updateData = req.body;
        if(updateData.description == undefined || updateData.done == undefined){
            return res.status(400).json({message: "MISSING MANDATORY FIELDS"});
        }

        const taskFromDb = await taskManager.getTaskByID(id);
        if(!taskFromDb){
            return res.status(404).json({message: "No se encontró la tarea"});
        }
        
        if(updateData.description == taskFromDb.description && updateData.done == taskFromDb.done){
            return res.status(404).json({message: "No hay cambios"});
        }

        const updatedTask = await taskManager.updateTask(id, updateData);
        if(!updatedTask){
            return res.status(500).json({message: "ALGO MAL"});
        }

        return res.status(201).json({message: "SUCCESS",  data: updatedTask});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
})


export default taskRouter;