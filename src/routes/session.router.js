import { Router } from "express";
import jwt from "jsonwebtoken";
import { isValidPassword } from "../utils/util.js";
import passport from "passport";
import UsersManager from "../manager/user.manager.js";
import TaskManager from "../manager/task.manager.js";

const sessionRouter = Router();
const userManager = new UsersManager();
const taskManager = new TaskManager();


sessionRouter.post("/register", async (req, res) => {
    const { firstName, lastName, email, password, role } = req.body;
    
    try {
        const existsUser = await userManager.getByEmail(email);

        if(existsUser){
            return res.status(400).json({message: "El email ya está registrado", data: null});
        }
        const tasks = await taskManager.getAllTasks();
        const user = await userManager.createUser(firstName, lastName, email, password, tasks, role);
        return res.status(201).json({message: "Usuario registrado!", data: user, redirectUrl: "/login"});

    } catch (error) {
        return res.status(500).json({message: error.message});
    }
});

sessionRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userManager.getByEmail(email);

        if(user){
            if(isValidPassword(password, user)){
                req.user = {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    role: user.role
                }

                const token = jwt.sign({user: user.email, role: user.role}, "coderhouse", { expiresIn: 1000 * 60 * 60 });
                res.cookie("token", token, { httpOnly: true, maxAge: 1000 * 60 *60 });
                return res.status(200).json({ message: "Usuario logueado!", data: user});
            }

            return res.status(400).json({message: "Contraseña incorrecta", data: null});
        }
        return res.status(404).json({message: "Usuario no encontrado", data: null});

    } catch (error) {
        return res.status(500).json({message: error.message});
    }
});

sessionRouter.post("/logout", (req, res) => {
    res.clearCookie("connect.sid");
    //res.clearCookie("coderCookieToken");
    req.logout((error) => {
        if(error){
            return res.status(500).json({message: "Error al cerrar la sesión", error});
        }
        res.status(200).json({message: "Sesión cerrada", redirectUrl: "/login"});
    });
});
//online - isOnline
sessionRouter.post("/isOnline", passport.authenticate("isOnline", { session: false }), async (req, res) => {
    if(req.user) {
        const userDB = await userManager.getByEmail(req.user.user);
        return res.status(200).json({ userId: userDB._id});
    }
    return res.status(400).json({message: `No autorizado`, data: null});
});

export default sessionRouter;