
import { MedicoRoute } from "./medicos.routes.js";
import e from "express";

const Rotas = e.Router()

Rotas.use('/medicos', MedicoRoute)
export{Rotas}