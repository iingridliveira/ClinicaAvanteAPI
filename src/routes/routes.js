import { PacienteRoute } from "./paciente.routes.js";
import { MedicoRoute } from "./medicos.routes.js";
import { Router } from "express";


const Rotas = Router();

Rotas.use('/paciente', PacienteRoute);
Rotas.use('/medicos', MedicoRoute)

export{Rotas}

