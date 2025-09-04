import { criarPaciente } from "../controllers/paciente.controller.js";
import e from "express";

const PacienteRoute = e.Router()

PacienteRoute.post('/criarpaciente', criarPaciente)

export{PacienteRoute}