import { criarMedico, deleteOneMedicos, getAllMedicos, getOneMedicos, updateMedicos } from "../controllers/medico.controller.js";
import e from "express";

const MedicoRoute = e.Router()

MedicoRoute.post('/crirmedico', criarMedico)
MedicoRoute.get('/medicotodos', getAllMedicos)
MedicoRoute.get('/:id', getOneMedicos)
MedicoRoute.delete('/:id', deleteOneMedicos)
MedicoRoute.put('/:id', updateMedicos)
export{MedicoRoute}
