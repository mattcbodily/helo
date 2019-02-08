require('dotenv').config();
const express = require('express');
const { json } = require('body-parser');
const massive = require('massive');
const sessions = require('express-session');
const ctrl = require('./controller');
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;

const app = express();
app.use(json());

app.use(sessions({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    maxAge: null
}))

massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
    app.listen(SERVER_PORT, () => {console.log(`Simulating on port ${SERVER_PORT}`)})
})

app.post('/auth/register', ctrl.register);
app.post('/auth/login', ctrl.login);