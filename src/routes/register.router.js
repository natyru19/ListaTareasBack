import { Router } from "express";
import UserManager from "../manager/user.manager.js";

const registerRouter = Router();
const userManager = new UserManager();

registerRouter.post("/register", async (req, res) => {
    const { firstName, lastName, email, password, role } = req.body;
    
    try {
        const existsUser = await userManager.getByEmail(email);

        if(existsUser){
            return res.status(400).json({message: "El email ya está registrado", data: null});
        }
        const user = await userManager.createUser(firstName, lastName, email, password, tasks, role);
        return res.status(201).json({message: "Usuario registrado!", data: user});

    } catch (error) {
        return res.status(500).json({message: error.message});
    }
});

export default registerRouter;