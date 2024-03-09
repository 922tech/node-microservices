import express from 'express';
const swaggerUI = require('swagger-ui-express');
import { router as signInRouter } from './routes/signIn';

const morgan = require('morgan');
const session = require('express-session');

const app = express();
const swaggerDocument = require('../docs/swagger.json');

if (process.env.NODE_ENV !== 'production'){
    app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
}

app.use(morgan('dev'));
app.use(express.json());
app.set("trust proxy", true);

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure: process.env.NODE_ENV !== "test" &&
        process.env.NODE_ENV !== "development" 
    }
}));

app.use('/auth',signInRouter);

app.use(signInRouter);

app.get('', (req, res) => {
    
    res.status(200).json({'message':'hello'});
})

console.log('app started')
export default app;