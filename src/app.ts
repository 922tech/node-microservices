import express from 'express';
// import session from 'express-session';
const swaggerUI = require('swagger-ui-express');
import swaggerSpec from './utils/swagger';
import { body } from "express-validator";
import { router as signInRouter } from './routes/signIn';
const morgan = require('morgan');

const session: any = require('express-session')
const app = express();
const swaggerDocument = require('../docs/swagger.json');

if (process.env.NODE_ENV !== 'production'){
    app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
}
app.use(morgan('dev'));
app.use(express.json());
app.set("trust proxy", true);

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure: process.env.NODE_ENV !== "test" &&
        process.env.NODE_ENV !== "development" 
    }
}))
app.use(signInRouter)
console.log('app started')
export default app;