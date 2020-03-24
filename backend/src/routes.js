const express = require('express');

const OngController = require('./controllers/OngController');

const IncidentController = require('./controllers/IncidentController');

const ProfileController = require('./controllers/ProfileController');

const SessionController = require('./controllers/SessionController');

const connection = require('./database/connection') 

const routes = express.Router()



/*  Listagem das ONGS Cadastradas */
routes.get('/ongs', OngController.index)

/* Cadastro de novas ONGS */
routes.post('/ongs', OngController.create)


/*  Listagem dos Casos Cadastrados */
routes.get('/incidents', IncidentController.index);
/*  Listagem dos Casos separados por ONG */
routes.get('/profile', ProfileController.index);

/*  Cadastro de novos casos */
routes.post('/incidents', IncidentController.create);

/*  Deletar Casos */
routes.delete('/incidents/:id', IncidentController.delete);


routes.post('/sessions', SessionController.create);


module.exports = routes;