import { Request, Response, NextFunction } from "express";
import prismaClient from "../prisma";
import { verify } from "jsonwebtoken";

import dotenv from 'dotenv'
dotenv.config()

interface PlayLoad {
    sub: string
}

export default async function Auth(
    req: Request,
    res: Response,
    next: NextFunction
){

    const authtoken = req.headers.authorization as string


    if(!authtoken){
        res.status(401).json({
            status: 'Sem token',
            error: 'Sem login'
        })
    }
        const [_, token] = authtoken?.split(' ') 
        try {
            const { sub } = verify(
                token,
                process.env.JWT_SECRET as string,
            ) as PlayLoad
    
            req.user_id = sub
    
            return next()
        }catch(err){
            return res.status(401).end()
        }
   
}