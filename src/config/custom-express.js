require("marko/node-require").install();
require("marko/express");

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const { BASE_VIEWS_PATH } = require('../app/views/templates');

app.use('/static', express.static('src/app/public'));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(methodOverride(function (request, response) {
    if (request.body && typeof request.body === 'object' && '_method' in request.body) {
      var method = request.body._method;
      delete request.body._method;
      return method;
    }
  }));

const authenticationSession = require('./authentication-session');
authenticationSession(app);  

const routes = require('../app/routes/routes');
routes(app);

app.use(function (request, response, next) {
    return response.status(404).marko(
        BASE_VIEWS_PATH.ERROR_404
    )
});

app.use(function (error, request, response, next) {
    return response.status(500).marko(
        BASE_VIEWS_PATH.ERROR_500
    )
});

module.exports = app;