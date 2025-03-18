import { Router } from "express";
import jwt from "jsonwebtoken";
import { isValidPassword } from "../utils/util.js";
import UsersManager from "../manager/user.manager.js";

const loginRouter = Router();
const userManager = new UsersManager();

loginRouter.post("/", async (req, res) => {
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

                const token = jwt.sign({user: user.email, role: user.role}, "coderhouse", { expiresIn: 1000 * 60 * 60});
                res.cookie("coderCookieToken", token, { httpOnly: true, maxAge: 1000 * 60 *60 });
                return res.status(200).json({ message: "Usuario logueado!", data: user});
            }

            return res.status(400).json({message: "Contraseña incorrecta", data: null});
        }
        return res.status(404).json({message: "Usuario no encontrado", data: null});

    } catch (error) {
        return res.status(500).json({message: error.message});
    }
});

export default loginRouter;