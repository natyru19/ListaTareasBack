import express from "express";
import "./database.js";
import taskRouter from "./routes/task.router.js";
import cors from 'cors';
import initializePassport from "./config/passport.config.js";
import passport from 'passport';
import cookieParser from 'cookie-parser';
import sessionRouter from "./routes/session.router.js";
import morgan from "morgan";

const app = express();
const PUERTO = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("./src/public"));
app.use(cors({origin: ['http://localhost:5500', 'http://localhost:5501', 'http://127.0.0.1:5500', 'http://127.0.0.1:5501', 'https://stalwart-gelato-190621.netlify.app']}));
app.use(cookieParser());
app.use(passport.initialize());
initializePassport();
app.use(morgan('tiny'));

app.use("/api/tasks", taskRouter);
app.use("/api/session", sessionRouter);

app.listen(PUERTO, () => {
    console.log(`Servidor escuchando en el puerto ${PUERTO}`);
});


