
// import jwt from "jsonwebtoken";
import express, { NextFunction, Request, Response } from "express";
import { body } from "express-validator";

const router = express.Router()

router.get('api/auth/login',(req: Request, res: Response, next: NextFunction) => {
    res.json({message: 'hello'})
});

export { router };