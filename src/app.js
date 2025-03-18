import express from "express";
import "./database.js";
import taskRouter from "./routes/task.router.js";
import cors from 'cors';
import initializePassport from "./config/passport.config.js";
import passport from 'passport';
import cookieParser from 'cookie-parser';
import registerRouter from "./routes/register.router.js";
import loginRouter from "./routes/login.router.js";

const app = express();
const PUERTO = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("./src/public"));
app.use(cors({origin: ['http://localhost:5500', 'http://127.0.0.1:5500', 'https://stalwart-gelato-190621.netlify.app']}));
app.use(cookieParser());
app.use(passport.initialize());
initializePassport();

app.use("/api/tasks", taskRouter);
app.use("/api/register", registerRouter);
app.use("/api/login", loginRouter);

app.listen(PUERTO, () => {
    console.log(`Servidor escuchando en el puerto ${PUERTO}`);
});


