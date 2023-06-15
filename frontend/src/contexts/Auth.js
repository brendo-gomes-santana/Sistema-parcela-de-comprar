import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../service/Api";

export const AuthContext = createContext({})

export default function Auth({children}) {

    const navigate = useNavigate()

    const [user, setUser] = useState(null)
    const [loagind, setLoading] = useState(false)

    async function Login(acesso, senha){
        setLoading(true)
        await Api.post('session', {
            acesso,
            senha
        })
        .then((r)=> {
            setUser(r.data)
            Api.defaults.authorization = `Bearer ${r.data.token}`
            localStorage.setItem("@user", JSON.stringify(r.data))
            navigate('/painel')
            setLoading(false)
        })
        .catch((err)=> {
            alert(err.response.data.error)
            setLoading(false)

        })
    }


    async function deslogar(){
        localStorage.clear()
        setUser(null)
        navigate('/')
    }

  return (
    <AuthContext.Provider value={{
        Login,
        loagind,
        user,
        setUser,
        deslogar,
        authorization: !!user
    }}>
        {children}
    </AuthContext.Provider>
  )
}
