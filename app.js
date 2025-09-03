import express from "express"
import { Rotas } from "./src/routes/routes.js";

const app = express();
app.use(express.json());

app.use(Rotas)

export{ app }