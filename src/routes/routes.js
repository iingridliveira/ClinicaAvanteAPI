import { PacienteRoute } from "./paciente.routes.js";
import { MedicoRoute } from "./medicos.routes.js";
import { Router } from "express";
import { RotasConsultas } from "./consulta.routes.js";


const Rotas = Router();

Rotas.use('/paciente', PacienteRoute);
Rotas.use('/medicos', MedicoRoute)
Rotas.use('/consultas', RotasConsultas)
export{Rotas}

