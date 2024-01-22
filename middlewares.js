const session = require('express-session');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const validarPalabraMiddleware = (req, res, next) => {
    const palabraCorrecta = process.env.PALABRA_SECRETA || '';

    if (req.body.palabra && req.body.palabra === palabraCorrecta) {
        req.session.palabraSecreta = req.body.palabra;
        next();
    } else {
        res.redirect('/?error=1');
    }
};

const setupAPP = (app) => {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(session({
        secret: 'secretoSuperSecreto',
        resave: false,
        saveUninitialized: true,
    }));
};

const verificarSesionMiddleware = (req, res, next) => {
    if (req.session.palabraSecreta) {
        res.redirect('/?error=2');
    } else {
        next();
    }
};

module.exports = {
    validarPalabraMiddleware,
    verificarSesionMiddleware,
    setupAPP,
};