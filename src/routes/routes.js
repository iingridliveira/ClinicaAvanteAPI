import { PacienteRoute } from "./paciente.routes.js";
import { MedicoRoute } from "./medicos.routes.js";
import { Router } from "express";
import { criarPaciente } from "../controllers/pacienteController.js";

const Rotas = Router();

Rotas.use('/medico', MedicoRoute);
Rotas.use('/paciente', PacienteRoute);

Rotas.post("/pacientes", criarPaciente);


export { Rotas };


