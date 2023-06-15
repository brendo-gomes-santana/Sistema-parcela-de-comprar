import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Auth from '../contexts/Auth'
import Provite from '../contexts/Provite'

import Login from '../pages/Home'
import Cadastro from '../pages/Cadastrar'
import EsqueceuSenhaParteI from '../pages/EsqueceuSenha/ParteI'
import EsqueceuSenhaParteII from '../pages/EsqueceuSenha/ParteII'

import Painel from '../pages/Painel'
import NovoPagamento from '../pages/NovoPagamento'
import Configuracao from '../pages/Configuracao'

export default function RouterApp() {
  return (
    <Router>
      <Auth>
        <Routes>
            <Route path='/' element={ <Login/> } />
            <Route path='/cadastro' element={ <Cadastro/> } />
            <Route path='/esqueceu_senha' element={ <EsqueceuSenhaParteI/> } />
            <Route path='/atualizando_senha/:codigo' element={ <EsqueceuSenhaParteII/> } />

            <Route path='/painel' element={ <Provite> <Painel/> </Provite>  } />
            <Route path='/cadastra/pagamento' element={ <Provite> <NovoPagamento/> </Provite> }/>
            <Route path='/configuracao' element={ <Provite> <Configuracao/> </Provite> } />
        </Routes>
      </Auth>
    </Router>
  )
}
