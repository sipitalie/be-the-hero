const express = require('express');
const routes = express.Router();

const OngController =require('./controllers/OngController');
const IncidentController =require('./controllers/IncidentController');
const profileController =require('./controllers/profileController');
const sessionController =require('./controllers/sessionController');

//login
routes.post('/sessions', sessionController.create);
//rotas dos para criar e listar ongs 
routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

//rotas para criar e listar incidents(casos)
routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
//rota para deletar os incidents(casos)
routes.delete('/incidents/:id', IncidentController.delete);

//rota para listar todos os incidentes de uma ong
routes.get('/profile', profileController.index);



module.exports = routes;