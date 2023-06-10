import { useContext, useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "./Auth"

import Api from "../service/Api"

export default function Provite({children}) {
    const { setUser, authorization } = useContext(AuthContext)
    const [verificado, setVerificado] = useState(true)

    useEffect(()=> {
        (async () => {
            const user = JSON.parse(localStorage.getItem("@user"))
            if(user){
                setUser(user)
                Api.defaults.headers.authorization = `Bearer ${user.token}`
                setVerificado(false)
            }
            setVerificado(false)
        })()
    }, [setUser])
    
    if(verificado){
        return(
            <div style={{
                position: 'fixed', 
                width: '100%',
                height: '100%',

                display: 'flex',
                alignContent: 'center',
                justifyContent: 'center',
             }}>
               <span style={{color: 'var(--branco)'}}>Carregando...</span>
            </div>
        )
    }
    
    if(!authorization){
        return <Navigate to='/'/>
    }

    return children
}
