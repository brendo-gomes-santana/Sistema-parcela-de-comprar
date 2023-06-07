import prismaClient from "../../prisma";
import { compare } from "bcryptjs";

import { sign } from 'jsonwebtoken'

import dotenv from 'dotenv'
dotenv.config()

class sessionUserService{
    async execute(acesso: string, senha:string){

        if(!acesso || !senha){
            throw new Error('Preenchar todos os campos')
        }

        const user = await prismaClient.user.findFirst({
            where: { acesso }
        })

        if(!user){
            throw new Error('usuário não existe')
        }

        const verificacaoDeSenha = await compare(senha, user.senha)
        if(!verificacaoDeSenha){
            throw new Error('Senha incorreta')
        }

        const token = sign(
            {
                nome: user.nome,
                email: user.email
            },
            process.env.JWT_SECRET as string,
            {
                subject: user.id,
                expiresIn: '15d'
            }
        )

        return {
            id: user.id,
            nome: user.nome,
            email: user.email,
            token
        }
    }
}

export { sessionUserService }