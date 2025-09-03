import { criarMedico } from "../controllers/medico.controller.js";
import e from "express";

const MedicoRoute = e.Router()

MedicoRoute.post('/crirmedico', criarMedico)

export{MedicoRoute}
