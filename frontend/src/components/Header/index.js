import React, { useContext, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import { AuthContext } from '../../contexts/Auth'

import { AiOutlineHome, AiOutlineFileAdd } from 'react-icons/ai' // criar pagamento | home
import { IoSettingsOutline } from 'react-icons/io5' //configuração
import { MdOutlineLogout } from 'react-icons/md' // logout

import { RxHamburgerMenu } from 'react-icons/rx' // abrir
import { AiOutlineClose } from 'react-icons/ai' //fecha

import './style.scss'

export default function Header() {

    const { deslogar } = useContext(AuthContext)
    const [abrir, setAbrir] = useState(true)
    const navRef = useRef();
    
    const showNavbar = ()=>{
        setAbrir(!abrir)
        navRef.current.classList.toggle('resposive_nav')
    }
  return (
    <>
    <header ref={navRef}>
        <Link to='/painel'>
            <img src={require('../../imgs/logo.png')} alt="Logo" className='logoHeader'/>
        </Link>
        <nav className='navHeader'>
            <Link to='/painel'> <AiOutlineHome className='logoNav' onClick={showNavbar}/> Home</Link>
            <Link to='/cadastra/pagamento'><AiOutlineFileAdd className='logoNav' onClick={showNavbar}/> Criar pagamento</Link>
            <Link> <IoSettingsOutline className='logoNav' onClick={showNavbar}/> Configuração </Link>
            <button onClick={ () => deslogar()} > <MdOutlineLogout className='logoNav' onClick={showNavbar}/>Sair</button>
        </nav>
    </header>
    <button onClick={showNavbar} className='BotaoDinamico'>{abrir ? <RxHamburgerMenu/> : <AiOutlineClose/>}</button>
    </>
  )
}
