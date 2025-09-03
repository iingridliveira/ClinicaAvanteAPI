import { Prisma } from "@prisma/client";

const criarMedico = async(req, res)=>{

  const { nome,especialidade, consultas } = req.body;
  try {
    const novoMedico = await  Prisma.Medico.create({
      data: {
        nome,especialidade, consultas 
      },
    });
    res.status(201).json(novoMedico);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao adicionar o Médico' });

  }
};

export {criarMedico}





