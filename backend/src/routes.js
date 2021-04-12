const { Router } = require('express');

const EmpresaController = require('./controllers/EmpresaController');
const AuthController = require('./controllers/AuthController');

const routes = Router();

routes.post('/login', AuthController.logar);
routes.get('/empresas', EmpresaController.index);
routes.post('/empresas', EmpresaController.store);
routes.delete('/empresa/:id', EmpresaController.delete);
routes.put('/empresa/:id', EmpresaController.update);
routes.post('/empresas/paginacao', EmpresaController.paginacao);
routes.get('/empresas/search/:search', EmpresaController.search);

module.exports = routes;
