import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const criarMedico = async (req, res) => {

  const { nome, especialidade } = req.body;
  try {
    const novoMedico = await prisma.Medico.create({
      data: {
        nome, especialidade
      },
    });
    res.status(201).json(novoMedico);
  } catch (error) {

    res.status(400).json({ error: 'Erro ao adicionar o Médico' });

  }
};


const getAllMedicos = async (req, res) => {
  try {
    const allmedicos = await prisma.medico.findMany()
    res.status(200).json(allmedicos)
  } catch (error) {
    res.status(400).json({ error: 'Erro ao adicionar o Médico' });

  }

}

const getOneMedicos = async (req, res) => {
  const { id } = req.params;
  try {
    const medico = await prisma.medico.findUnique({
      where: {
        id: String(id),
      },
    });
     if (!medico) {
      return res.status(404).json({ error: "Médico não encontrado" });
    }

    res.status(200).json(medico);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao encontrar o Médico' });

  }

}


const deleteOneMedicos = async (req, res) => {
  const { id } = req.params;
  try {
    const medicoApagar = await prisma.medico.delete({
      where: {
        id: String(id),
      },
    });
    !medico
      if (!medico) {
      return res.status(404).json({ error: "Médico não encontrado" });
    }

    res.status(200).json(medicoApagar)
  } catch (error) {
    res.status(400).json({ error: 'Erro ao pesquisar o Médico' });

  }

}
const updateMedicos = async (req, res) => {
  const { id } = req.params;
  const { nome, especialidade } = req.body;
  try {
      const medico = await prisma.medico.update({
      where: {
        id: String(id), 
      },
      data: {
        nome,
        especialidade,
      },
    });

    res.status(200).json(medico);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao pesquisar o Médico' });

  }

}

export {
  criarMedico,
  getAllMedicos,
  getOneMedicos,
  deleteOneMedicos,
  updateMedicos
}





