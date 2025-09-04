import e from "express";


import { pacienteController } from "../controllers/paciente.controller.js";
const instacieCntrolerpaciente = new pacienteController

const PacienteRoute = e.Router()


PacienteRoute.post('/pacientes', instacieCntrolerpaciente.criarPaciente);
PacienteRoute.get('/pacientes', instacieCntrolerpaciente.listarPacientes);
PacienteRoute.get('/pacientes/:id', instacieCntrolerpaciente.buscarPaciente);
PacienteRoute.get('/pacientes/:id/proximas', instacieCntrolerpaciente.proximasConsultas);
PacienteRoute.put('/pacientes/:id', instacieCntrolerpaciente.atualizarPaciente);
PacienteRoute.delete('/pacientes/:id', instacieCntrolerpaciente.deletarPaciente);

export { PacienteRoute }