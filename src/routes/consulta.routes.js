import e from 'express'
import { createConsulta, deleteOneConsulta, getAllConsultas, getOneConsultas, updateConsulta } from '../controllers/consulta.controller.js'

const  RotasConsultas = e.Router()

RotasConsultas.get('/', getAllConsultas)
RotasConsultas.get('/:id', getOneConsultas)
RotasConsultas.post('/', createConsulta)
RotasConsultas.put('/:id', updateConsulta)
RotasConsultas.delete('/:id', deleteOneConsulta)

export {RotasConsultas}