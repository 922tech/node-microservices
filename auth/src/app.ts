import express from 'express';
import { router as signInRouter } from './routes/signIn';
import { router as signupRouter } from './routes/signup';
import {
  errorMiddleware,
  versioningMiddleware,
} from './middlewares/middlewares';

const swaggerUI = require('swagger-ui-express');
const morgan = require('morgan');
const session = require('express-session');
const app = express();
const swaggerDocument = require('../docs/swagger.json');

// middlewares
if (process.env.NODE_ENV !== 'production') {
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
}
app.use(morgan('dev'));

app.use(express.json());

app.set('trust proxy', true);
console.log(process.env.NODE_ENV);

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: !['test', 'development'].includes(process.env.NODE_ENV as string),
    },
  }),
);
app.use(versioningMiddleware);

// router registration
app.use('/auth/signin', signInRouter);
app.use('/auth/signup', signupRouter);

// apply error middleware
app.use(errorMiddleware);

console.log('App started!');
export default app;
