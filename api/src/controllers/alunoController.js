const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const create = async (req, res) => {
    try {
        const { ra, nome, email, telefones } = req.body;

        if (!ra || !nome || !email) {
            return res.status(400).json({ error: 'RA, nome e email são obrigatórios' });
        }

        const aluno = await prisma.aluno.create({
            data: {
                ra,
                nome,
                email,
                telefones: {
                    create: telefones || []
                }
            },
            include: {
                telefones: true
            }
        });

        return res.status(201).json(aluno);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const read = async (req, res) => {
    try {
        const alunos = await prisma.aluno.findMany({
            include: {
                telefones: true
            },
            orderBy: {
                nome: 'asc'
            }
        });
        return res.json(alunos);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const readOne = async (req, res) => {
    try {
        const aluno = await prisma.aluno.findUnique({
            where: {
                ra: req.params.ra
            },
            include: {
                telefones: true,
                atividades: true
            }
        });

        if (!aluno) {
            return res.status(404).json({ error: 'Aluno não encontrado' });
        }

        return res.json(aluno);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const update = async (req, res) => {
    try {
        const { ra } = req.params;
        const { nome, email, telefones } = req.body;

        const aluno = await prisma.aluno.update({
            where: { ra },
            data: {
                nome,
                email
            }
        });

        if (telefones) {
            await prisma.telefone.deleteMany({
                where: { alunoRa: ra }
            });

            await prisma.telefone.createMany({
                data: telefones.map(tel => ({
                    ...tel,
                    alunoRa: ra
                }))
            });
        }

        const alunoAtualizado = await prisma.aluno.findUnique({
            where: { ra },
            include: {
                telefones: true
            }
        });

        return res.status(202).json(alunoAtualizado);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const remove = async (req, res) => {
    try {
        const { ra } = req.params;

        await prisma.telefone.deleteMany({
            where: { alunoRa: ra }
        });

        await prisma.aluno.delete({
            where: { ra }
        });

        return res.status(204).send();
    } catch (error) {
        return res.status(404).json({ error: error.message });
    }
};

module.exports = { create, read, readOne, update, remove };