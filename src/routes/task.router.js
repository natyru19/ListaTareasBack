import { Router } from "express";
import TaskManager from "../manager/task.manager.js";

const taskRouter = Router();
const taskManager = new TaskManager();

taskRouter.get("/",async (req, res) => {
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
        return res.status(500).json({error: error.message})        
    }

});

taskRouter.post("/",async (req, res) => {
    const newTask = req.body;
    const createTask = await taskManager.addTask(newTask);

    try {
        if(createTask){
            return res.status(201).json({message: "Tarea agregada", data: createTask});
        }
        return res.status(400).json({message: "Error al agregar la tarea", data: null});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
});

taskRouter.delete("/", async(req,res)=>{
    const {id} = req.query;
    const task = await taskManager.getTaskByID(id);
    if(task){
        let borrado = await taskManager.deleteById(id);
        return res.status(200).json({data:borrado})
    }
    return res.status(404).json({message: "no se encontró el task"})
})

taskRouter.put("/", async(req,res)=>{
    const {id} = req.query;
    const updatedData = req.body;
    const task = await taskManager.getTaskByID(id);
    if(task){
        const updatedTask = await taskManager.updateTask(id, updatedData)
        return res.status(201).json({data: updatedTask})
    }
    return res.status(404).json({message: "no se encontró el task"})
})


export default taskRouter;