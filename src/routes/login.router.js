import { Router } from "express";

const loginRouter = Router();

registerRouter.post("/login", (req, res) => {
    const { usuarioLogueado, passLogueada } = req.body;
});

export default loginRouter;