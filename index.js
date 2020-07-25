import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cluster from 'cluster';

import routes from './routes';
import errorHandler from './middleware/errorHandler';
import databaseConnection from './config/dbConnection';
const passport = require("passport");

dotenv.config();

const app = express();
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true, }));
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());


app.use('/', routes);
app.use(errorHandler);

if (cluster.isMaster && process.env.NODE_ENV === 'production') {
    const numWorkers = require('os').cpus().length;

    console.log(`Master cluster setting up ${numWorkers} workers...`);

    for (let i = 0; i < numWorkers; i += 1) {
        cluster.fork();
    }

    cluster.on('online', (worker) => {
        console.log(`Worker ${worker.process.pid} is online`);
    });

    cluster.on('exit', (worker, code, signal) => {
        console.log(
            `Worker ${
            worker.process.pid
            } died with code: ${code}, and signal: ${signal}`,
        );
        console.log('Starting a new worker');
        cluster.fork();
    });
} else {
    app.listen(process.env.APP_PORT, () => console.log(`App listening on port ${process.env.APP_PORT}!`))
}