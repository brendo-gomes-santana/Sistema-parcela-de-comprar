import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../service/Api";

export const AuthContext = createContext({})

export default function Auth({children}) {

    const navigate = useNavigate()

    const [user, setUser] = useState(null)
    const [loagind, setLoading] = useState(false)

    async function Login(acesso, senha){
        await Api.post('session', {
            acesso,
            senha
        })
        .then((r)=> {
            console.log(r.data)
            setUser(r.data)
            Api.defaults.authorization = `Bearer ${r.data.token}`
            localStorage.setItem("@user", JSON.stringify(r.data))
            navigate('/painel')

        })
        .catch((err)=> {
            alert(err.response.data.error)
        })
    }

  return (
    <AuthContext.Provider value={{
        Login,
        loagind,
        user,
        setUser,
        authorization: !!user
    }}>
        {children}
    </AuthContext.Provider>
  )
}
