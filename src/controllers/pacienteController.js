import { PrismaClient } from "@prisma/client";

const criarPaciente = async(req, res)=>{

  const { nome, email, dataNascimento, consultas } = req.body;
  try {
    const novoPaciente = await  Prisma.Paciente.create({
      data: {
        nome, email, dataNascimento, consultas
      },
    });
    res.status(201).json(novoPaciente);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao adicionar o Paciente' });

  }
};

const prisma = new PrismaClient();

export const pacienteController = {
  async listarPacientes(req, res) {
    try {
      const pacientes = await prisma.paciente.findMany({
        include: {
          consultas: true
        }
      });
      res.json(pacientes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

   async buscarPaciente(req, res) {
    try {
      const { id } = req.params;
      const paciente = await prisma.paciente.findUnique({
        where: { id: parseInt(id) },
        include: {
          consultas: {
            include: {
              medico: true
            }
          }
        }
      });
      
      if (!paciente) {
        return res.status(404).json({ error: 'Paciente não encontrado' });
      }
      
      res.json(paciente);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async criarPaciente(req, res) {
    try {
      const { nome, email, dataNascimento } = req.body;
      
      const paciente = await prisma.paciente.create({
        data: {
          nome,
          email,
          dataNascimento: new Date(dataNascimento)
        }
      });
      
      res.status(201).json(paciente);
    } catch (error) {
      if (error.code === 'P2002') {
        return res.status(400).json({ error: 'Email já cadastrado' });
      }
      res.status(500).json({ error: error.message });
    }
  },

  async atualizarPaciente(req, res) {
    try {
      const { id } = req.params;
      const { nome, email, dataNascimento } = req.body;
      
      const paciente = await prisma.paciente.update({
        where: { id: parseInt(id) },
        data: {
          nome,
          email,
          dataNascimento: dataNascimento ? new Date(dataNascimento) : undefined
        }
      });
      
      res.json(paciente);
    } catch (error) {
      if (error.code === 'P2025') {
        return res.status(404).json({ error: 'Paciente não encontrado' });
      }
      if (error.code === 'P2002') {
        return res.status(400).json({ error: 'Email já cadastrado' });
      }
      res.status(500).json({ error: error.message });
    }
  },

  async deletarPaciente(req, res) {
    try {
      const { id } = req.params;
      
      await prisma.paciente.delete({
        where: { id: parseInt(id) }
      });
      
      res.status(204).send();
    } catch (error) {
      if (error.code === 'P2025') {
        return res.status(404).json({ error: 'Paciente não encontrado' });
      }
      res.status(500).json({ error: error.message });
    }
  },

    async proximasConsultas(req, res) {
    try {
      const { id } = req.params;
      
      const consultas = await prisma.consulta.findMany({
        where: {
          pacienteId: parseInt(id),
          data: {
            gte: new Date()
          }
        },
        include: {
          medico: true
        },
        orderBy: {
          data: 'asc'
        }
      });
      
      res.json(consultas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};


export {criarPaciente}