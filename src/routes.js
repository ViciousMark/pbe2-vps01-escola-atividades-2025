const express = require('express');
const routes = express.Router();

const alunoController = require('./controllers/alunoController');
const atividadeController = require('./controllers/atividadeController');

routes.get('/', (req, res) => {
  return res.json({ titulo: 'Escola ACME' });
});

routes.post('/alunos', alunoController.create);
routes.get('/alunos', alunoController.read);
routes.get('/alunos/:ra', alunoController.readOne);
routes.put('/alunos/:ra', alunoController.update);
routes.delete('/alunos/:ra', alunoController.remove);

routes.post('/atividades', atividadeController.create);
routes.get('/atividades', atividadeController.read);
routes.get('/atividades/aluno/:ra', atividadeController.readByAluno);
routes.get('/atividades/:id', atividadeController.readOne);
routes.put('/atividades/:id', atividadeController.update);
routes.get('/atividades/:id/calcular-parcial', atividadeController.calcularParcial);
routes.delete('/atividades/:id', atividadeController.remove);

module.exports = routes;