const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./db/connection');

const oauthModel = require('./authorization/oauthModel');
const db_user = require('./db/db_oauth_user');
const db_token = require('./db/db_oauth_token');
const oauthserver = require('node-oauth2-server');
const oauthMethods = require('./authorization/oauthMethods');
const app = express();

app.oauth = oauthserver({
    model: oauthModel,
    grants: ['password'],
    debug: true,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(app.oauth.errorHandler());

app.post('/login', app.oauth.grant(), oauthMethods.login);
app.post('/registerUser', oauthMethods.registerUser);

let port = process.env.port || 9000;
app.listen(port, function () {
    console.log('Server gestartet auf Port: ' + port);
});