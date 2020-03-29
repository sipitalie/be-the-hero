const express = require('express');
const routes = express.Router();
//celebrate é para as validacoes investigar mais sobre isso
const { celebrate, Segments, Joi} = require('celebrate');

const OngController =require('./controllers/OngController');
const IncidentController =require('./controllers/IncidentController');
const profileController =require('./controllers/profileController');
const sessionController =require('./controllers/sessionController');

//login
routes.post('/sessions', sessionController.create);
//rotas dos para criar e listar ongs 
routes.get('/ongs', OngController.index);
routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email:Joi.string().required().email(),
        whatsapp:Joi.string().required().min(9).max(11),
        city: Joi.string().required(),
        uf:Joi.string().required().length(2),
    })
}), OngController.create);

//rotas para criar e listar incidents(casos)
routes.get('/incidents', celebrate({
    [Segments.QUERY]:Joi.object().keys({
        page: Joi.number(),
    })
}), IncidentController.index);
routes.post('/incidents', IncidentController.create);
//rota para deletar os incidents(casos)
routes.delete('/incidents/:id',celebrate({
    [Segments.PARAMS]:Joi.object().keys({
        id: Joi.number().required(),
    })
}), IncidentController.delete);

//rota para listar todos os incidentes de uma ong
routes.get('/profile',celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}), profileController.index);



module.exports = routes;