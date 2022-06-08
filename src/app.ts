process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.APP_ENV = process.env.APP_ENV || 'development';

import dotenv from 'dotenv';
import express from "express";
import loadContainer from './container';
import { loadControllers } from 'awilix-express';
import cors from 'cors';

const app: express.Application = express();

dotenv.config({
    path: `${__dirname}/../config/${process.env.APP_ENV}.env`
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
loadContainer(app);

app.use(loadControllers(
    'controllers/*.ts',
    {cwd: __dirname}
));


export {app};