import { Prisma } from "@prisma/client";

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

export {criarPaciente}