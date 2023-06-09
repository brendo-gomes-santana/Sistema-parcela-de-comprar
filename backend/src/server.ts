import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors'
import cors from 'cors'

import { router } from './router'


const app = express()

app.use(express.json())
app.use(cors())

app.use('/foto', express.static("uploads"))

app.use(router)


app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof Error){

        return res.status(400).json({
            error: err.message
        })
    }
})


app.listen(3333, () => console.log('Servidor online'))
