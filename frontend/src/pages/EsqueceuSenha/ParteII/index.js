import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import Button from '../../../components/Button'
import Input from '../../../components/Input'
import InputSenha from '../../../components/InputSenha'

import Api from '../../../service/Api'

import './style.scss';

export default function EsqueceuSenhaParteII() {

    const navigate = useNavigate()
    const { codigo } = useParams()

    useEffect(()=> {
        (async () => {
            await Api.get('/infor', {
                params: {
                    codigo
                }
            })
            .then(()=> {
                
            })
            .catch(()=> {
                navigate('/')
            })
        })()
    },[codigo, navigate])

    const [loading, setLoading] = useState(false)
    const [codigoAcesso, setCodigo] = useState('')
    const [senha, setSenha] = useState('')
    const [confirmacao, setConfirmacao] = useState('')

    async function handleNovaSenha(e){
        e.preventDefault()
        if(!codigoAcesso || !senha || !confirmacao){
            alert('Preenchar todos os campos')
            return;
        }

        if(senha !== confirmacao){
            alert('As senhas não são iguais')
            return;
        }
        setLoading(true)
        await Api.patch('/esqueceu', {
            codigo: codigoAcesso,
            NovaSenha: senha,
            Confirmacao: confirmacao
        })
        .then(()=> {
            setLoading(false)
            navigate('/')
        })
        .catch((err)=> {
            setLoading(false)
            alert(err.response.data.error)
        })

    }
    
  return (
    <main className='ContainerNovaSenha' >
        <img src={require('../../../imgs/logo.png')} alt="logo" />
        <h1>Crie uma nova senha</h1>
        <form className='formNovaSenha' onSubmit={handleNovaSenha}>
            <Input placeholder='Digite o codigo' className='inputNovaSenha'
            value={codigoAcesso} onChange={ v => setCodigo(v.target.value) }/><br/>
            <InputSenha placeholder='Digite a nova senha'
            value={senha} onChange={ v => setSenha(v.target.value) }/><br/>
            <InputSenha placeholder='Confirme a senha' 
            value={confirmacao} onChange={ v => setConfirmacao(v.target.value) }/>

            <Button type='submit' 
            disabled={loading} 
            id={loading && ('desativado')} >
                {loading ? 'carregando...' : 'Cadastrar nova senha'}
            </Button>
        </form>
    </main>
  )
}
