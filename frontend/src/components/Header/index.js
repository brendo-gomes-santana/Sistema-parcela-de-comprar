import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import { AuthContext } from '../../contexts/Auth'

import './style.scss'

export default function Header() {

    const { deslogar } = useContext(AuthContext)

  return (
    <header>
        <Link to='/painel'>
            <img src={require('../../imgs/logo.png')} alt="Logo" className='logoHeader'/>
        </Link>
        <nav className='navHeader'>
            <Link to='/painel'>Home</Link>
            <Link>Criar um pagamento</Link>
            <Link> Configuração </Link>
            <button onClick={ () => deslogar()} >Sair</button>
        </nav>
    </header>
  )
}
