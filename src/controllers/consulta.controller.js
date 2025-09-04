import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createConsulta = async (req, res) => {

    const { data, descricao, medicoId, pacienteId } = req.bory;
    try {
        const newConsulta = await prisma.consulta.create({
            data: {
                data, descricao, medicoId, pacienteId
            }
        }
        )

        res.status(201).json(newConsulta);
    } catch (error) {

        res.status(400).json({ error: 'Erro ao criar uma Consulta' });
    }
}

const updateConsulta = async (req, res) => {
    const { id } = req.params;
    const { data, descricao, medicoId, pacienteId } = req.bory;
    try {
        const Consultamudada = await prisma.consulta.update({
            where: {
                id: String(id),
            },
        data: {
            data, descricao, medicoId, pacienteId
        }
    }
        )

res.status(201).json(Consultamudada);
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
                        name: true,
                    },
                },
                paciente: {
                    select: {
                        name: true,
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
                        name: true,
                    },
                },
                paciente: {
                    select: {
                        name: true,
                    },
                },
            },
        });

        res.status(200).json(consultas);


    } catch (error) {
        res.status(400).json({ error: 'Erro ao pesquisar consultas' });

    }

}


const deleteOneConsultas = async (req, res) => {
  const { id } = req.params;
  try {
    const consultApagar = await prisma.consulta.delete({
      where: {
        id: String(id),
      },
    });
    !medico
      if (!consulta) {
      return res.status(404).json({ error: "Médico não encontrado" });
    }

    res.status(200).json(consultApagar)
  } catch (error) {
    res.status(400).json({ error: 'Erro ao pesquisar o Médico' });

  }

}

export{ createConsulta, 
    getAllConsultas, 
    getOneConsultas,
    deleteOneConsultas,
    updateConsulta}