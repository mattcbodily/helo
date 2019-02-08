require('dotenv').config();
const express = require('express');
const { json } = require('body-parser');
const massive = require('massive');
const { SERVER_PORT, CONNECTION_STRING } = process.env;

const app = express();
app.use(json());

massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
    app.listen(SERVER_PORT, () => {console.log(`Simulating on port ${SERVER_PORT}`)})
})