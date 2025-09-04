import { PrismaClient } from "@prisma/client";

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
            include: {
                medico: {
                    select: {
                        nome: true,
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

const getOneConsultas = async (req, res) => {
    const { id } = req.params
    try {
        const consultas = await prisma.consulta.findUnique({

            where: {
                id: String(id),
            },
            include: {
                medico: {
                    select: {
                        nome: true,
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


export {
    createConsulta,
    getAllConsultas,
    getOneConsultas,
    deleteOneConsulta,
    updateConsulta
}