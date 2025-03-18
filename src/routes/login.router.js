import { Router } from "express";

const loginRouter = Router();

loginRouter.post("/login", (req, res) => {
    const { usuarioLogueado, passLogueada } = req.body;
});

export default loginRouter;