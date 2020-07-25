import express from 'express';
import studentRoutes from './studentProfile';
import loginRoutes from './login';

const app = express();

app.use('', studentRoutes);

app.use('/userLogin', loginRoutes);

module.exports = app;
