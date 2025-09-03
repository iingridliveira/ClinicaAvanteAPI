import e from "express";
 
import { pacienteController } from "../controllers/pacienteController.js";

const PacienteRoute = e.Router()


PacienteRoute.post ('/pacientes', pacienteController.criarPaciente);
PacienteRoute.get ('/pacientes', pacienteController.listarPacientes);
PacienteRoute.get('/pacientes/:id', pacienteController.buscarPaciente);
PacienteRoute.get('/pacientes/:id/proximas', pacienteController.proximasConsultas);
PacienteRoute.put('/pacientes/:id', pacienteController.atualizarPaciente);
PacienteRoute.delete('/pacientes/:id', pacienteController.deletarPaciente);

export{PacienteRoute}