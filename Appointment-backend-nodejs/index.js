const express = require('express');
const connection = require('./connection');
const doctorRoute = require('./src/controller/doctor');

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/doctor', doctorRoute);

module.exports = app;
