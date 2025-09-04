import { PrismaClient } from "@prisma/client";
import { addMinutes } from "date-fns";
const prisma = new PrismaClient();

const createConsulta = async (req, res) => {
    const { data, descricao, medicoId, pacienteId } = req.body; // corrigi aqui

    try {
        const newConsulta = await prisma.consulta.create({
            data: {
                data: new Date(data),
                descricao,
                medicoId,
                pacienteId,
            },
        });

        res.status(201).json(newConsulta);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Erro ao criar uma Consulta' });
    }
};

const updateConsulta = async (req, res) => {
    const { id } = req.params;
    const { data, descricao, medicoId, pacienteId } = req.body;
    try {
        const Consultamudada = await prisma.consulta.update({
            where: {
                id: String(id),
            },
            data: {
                data: new Date(data),
                descricao,
                medicoId,
                pacienteId
            }
        }
        )

        res.status(200).json(Consultamudada);
    } catch (error) {

        res.status(400).json({ error: 'Erro ao atualisar uma Consulta' });
    }
}
const getAllConsultas = async (req, res) => {
    try {
        const consultas = await prisma.consulta.findMany({
            select: {
                id: true,
                data: true,
                descricao: true,
                medico: {
                    select: {
                        nome: true,
                        especialidade: true
                    },
                },
                paciente: {
                    select: {
                        nome: true,
                    },
                },
            },
        });

        res.status(200).json(consultas);
    } catch (error) {
        console.error(error.message); // só aqui
        res.status(400).json({ error: 'Erro ao pesquisar consultas' });
    }
};

const getOneConsultas = async (req, res) => {
    const { id } = req.params
    try {
        const consultas = await prisma.consulta.findUnique({

            where: {
                id: String(id),
            },
           select: {
                id: true,
                data: true,
                descricao: true,
                medico: {
                    select: {
                        nome: true,
                        especialidade: true
                    },
                },
                paciente: {
                    select: {
                        nome: true,
                    },
                },
            },
        });

        res.status(200).json(consultas);


    } catch (error) {
        res.status(400).json({ error: 'Erro ao pesquisar consultas' });

    }

}


const deleteOneConsulta = async (req, res) => {
    const { id } = req.params;
    try {
        const consultApagar = await prisma.consulta.delete({
            where: {
                id: id,
            },
        });

        res.status(200).json(consultApagar);
    } catch (error) {
        console.error(error);


        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'Consulta não encontrada' });
        }

        res.status(400).json({ error: 'Erro ao deletar Consulta' });
    }
};



const getDisponibilidades = async (req, res) => {
    const { medicoId } = req.params;
    const { dia, slot } = req.query;

    const inicio = new Date(`${dia}T08:00:00`);
    const fim = new Date(`${dia}T18:00:00`);
    const duracao = Number(slot) || 30;
    try {

        const consultas = await prisma.consulta.findMany({
            where: {
                medicoId,
                data: {
                    gte: inicio,
                    lt: fim,
                },
            },
        });

        const ocupados = consultas.map(c => c.data.toISOString());


        let horarios = [];
        let atual = inicio;

        while (atual < fim) {
            const disponivel = !ocupados.includes(atual.toISOString());
            horarios.push({ horario: atual, disponivel });
            atual = addMinutes(atual, duracao);
        }

        res.status(200).json(horarios);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "Erro ao buscar disponibilidades" });
    }
};



export {
    createConsulta,
    getAllConsultas,
    getOneConsultas,
    deleteOneConsulta,
    updateConsulta,
    getDisponibilidades
}