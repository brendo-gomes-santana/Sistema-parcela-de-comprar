import prismaClient from "../../prisma";


class InforCodigoUserService{
    async execute(codigo:string){
        if(!codigo){
            throw new Error('Informe o id do usuário')
        }

        const infor = await prismaClient.user.findFirst({
            where: { id: codigo},
            select: {
                id:true,
                nome:true,
                email:true,
            }
        })

        if(!infor){
            throw new Error('Codigo errado')
        }


        return infor

    }
}

export { InforCodigoUserService }