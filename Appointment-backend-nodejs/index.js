const express = require('express');
const cors = require('cors');
const connection = require('./connection');
const doctorRoute = require('./src/controller/doctor');
const appointmentRoute = require('./src/controller/appointment');

const app = express();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/doctor', doctorRoute);
app.use('/appointment', appointmentRoute);

module.exports = app;
