const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const create = async (req, res) => {
    try {
        const { nome, alunoRA, dataInicio, dataEntrega, peso } = req.body;

        if (!nome || !alunoRA || !dataInicio || !peso) {
            return res.status(400).json({ error: 'Nome, alunoRA, dataInicio e peso são obrigatórios' });
        }

        const aluno = await prisma.aluno.findUnique({
            where: { ra: alunoRA }
        });

        if (!aluno) {
            return res.status(404).json({ error: 'Aluno não encontrado' });
        }

        const atividade = await prisma.atividade.create({
            data: {
                nome,
                alunoRa: alunoRA,
                dataInicio: new Date(dataInicio),
                dataEntrega: dataEntrega ? new Date(dataEntrega) : null,
                peso
            },
            include: {
                aluno: true
            }
        });

        return res.status(201).json(atividade);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const read = async (req, res) => {
    try {
        const atividades = await prisma.atividade.findMany({
            include: {
                aluno: true
            },
            orderBy: {
                dataInicio: 'desc'
            }
        });
        return res.json(atividades);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const readByAluno = async (req, res) => {
    try {
        const { ra } = req.params;
        
        const atividades = await prisma.atividade.findMany({
            where: {
                alunoRa: ra
            },
            include: {
                aluno: true
            },
            orderBy: {
                dataInicio: 'desc'
            }
        });

        return res.json(atividades);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const readOne = async (req, res) => {
    try {
        const atividade = await prisma.atividade.findUnique({
            where: {
                id: parseInt(req.params.id)
            },
            include: {
                aluno: true
            }
        });

        if (!atividade) {
            return res.status(404).json({ error: 'Atividade não encontrada' });
        }

        return res.json(atividade);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, dataEntrega, nota, peso, parcial } = req.body;

        const atividade = await prisma.atividade.update({
            where: {
                id: parseInt(id)
            },
            data: {
                nome,
                dataEntrega: dataEntrega ? new Date(dataEntrega) : null,
                nota,
                peso,
                parcial
            },
            include: {
                aluno: true
            }
        });

        return res.status(202).json(atividade);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const calcularParcial = async (req, res) => {
    try {
        const { id } = req.params;
        const { type } = req.query;

        const atividade = await prisma.atividade.findUnique({
            where: {
                id: parseInt(id)
            }
        });

        if (!atividade) {
            return res.status(404).json({ error: 'Atividade não encontrada' });
        }

        if (!atividade.nota) {
            return res.status(400).json({ error: 'Nota não definida para esta atividade' });
        }

        let parcial;
        if (type === 'simples') {
            parcial = atividade.nota * atividade.peso;
        } else {
        
            parcial = atividade.nota * (atividade.peso / 100);
        }

        const atividadeAtualizada = await prisma.atividade.update({
            where: {
                id: parseInt(id)
            },
            data: {
                parcial
            },
            include: {
                aluno: true
            }
        });

        return res.json({ parcial: atividadeAtualizada.parcial });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const remove = async (req, res) => {
    try {
        await prisma.atividade.delete({
            where: {
                id: parseInt(req.params.id)
            }
        });
        return res.status(204).send();
    } catch (error) {
        return res.status(404).json({ error: error.message });
    }
};

module.exports = { 
    create, 
    read, 
    readByAluno, 
    readOne, 
    update, 
    calcularParcial, 
    remove 
};