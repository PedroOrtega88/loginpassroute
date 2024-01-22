const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const routes = require('./routes');
const middlewares = require('./middlewares');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = 4000;

app.use(session({
    secret: process.env.PALABRA_SECRETA || 'secretoSuperSecreto',
    resave: false,
    saveUninitialized: true,
}));

app.use(bodyParser.urlencoded({ extended: true }));

routes.setup(app);
middlewares.setupAPP(app);

app.listen(PORT, () => {
    console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});