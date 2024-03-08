
// import jwt from "jsonwebtoken";
import express, { NextFunction, Request, Response } from "express";
import { body } from "express-validator";

const router = express.Router()

router.get('/signin',(req: Request, res: Response, next: NextFunction) => {
    console.log('LOGIN');
    res.json({message: 'hello'});
});

export { router };