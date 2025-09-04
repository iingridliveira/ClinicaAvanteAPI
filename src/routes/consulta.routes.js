import e from 'express'
import { createConsulta, deleteOneConsulta, getAllConsultas, getDisponibilidades, getOneConsultas, updateConsulta } from '../controllers/consulta.controller.js'

const  RotasConsultas = e.Router()

RotasConsultas.get('/', getAllConsultas)
RotasConsultas.get('/:id', getOneConsultas)
RotasConsultas.get('/disponibilidades/:id', getDisponibilidades )
RotasConsultas.post('/', createConsulta)
RotasConsultas.put('/:id', updateConsulta)
RotasConsultas.delete('/:id', deleteOneConsulta)



export {RotasConsultas}