import express from "express";
import "./database.js";
import taskRouter from "./routes/task.router.js";
import cors from 'cors';

const app = express();
const PUERTO = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("./src/public"));
app.use(cors({origin: ['http://localhost:5500', 'http://127.0.0.1:5500']}));

app.use("/api/tasks", taskRouter);

app.listen(PUERTO, () => {
    console.log(`Servidor escuchando en el puerto ${PUERTO}`);
});


