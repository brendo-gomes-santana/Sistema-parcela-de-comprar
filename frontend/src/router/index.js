import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Login from '../pages/Home'
import Cadastro from '../pages/Cadastrar'
import EsqueceuSenhaParteI from '../pages/EsqueceuSenha/ParteI'

export default function RouterApp() {
  return (
    <Router>
        <Routes>
            <Route path='/' element={ <Login/> } />
            <Route path='/cadastro' element={ <Cadastro/> } />
            <Route path='/esqueceu_senha' element={ <EsqueceuSenhaParteI/> } />
        </Routes>
    </Router>
  )
}
