// Archivo nodejs-express para inicializar servidor

// Variables y constantes
var createError = require('http-errors');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const fs = require('fs');

// Settings

app.set('port', process.env.PORT || 8081);
app.set('host', process.env.HOST || '0.0.0.0');

// Middlewares
app.use(morgan('tiny'));
app.use(express.json());

//Static files

app.use(express.static(path.join(__dirname,'public')));
app.use('/:anything',express.static(path.join(__dirname,'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.listen(app.get('port'),app.get('host'),()=>{
  console.log('Web page on port '+app.get('port') + " on host " + app.get('host'));
})
