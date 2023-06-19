import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { FiUpload } from 'react-icons/fi';

import Header from '../../components/Header'
import Button from '../../components/Button'
import Input from '../../components/Input'
import InputSenha from '../../components/InputSenha'
import Model from '../../components/Model'

import Foto from '../../imgs/user.jpg';

import Api, { UrlFoto } from '../../service/Api'

import styles from './style.module.scss'

export default function Configuracao() {

  const navigate = useNavigate()

  const [infor, setInfor] = useState([])
  const [querMesmoApagar, setQuerMesmoApagar] = useState(null)

  const [avatarurl, setAvatarUrl] = useState('')
  const [imagemAvatar, setImagemAvatar] = useState(null)


  const [nome, setNome] = useState('')
  const [acesso, setAcesso] = useState('')
  const [senha, setSenha] = useState('')

  const [loading, setLoading] = useState(false)

  useEffect(()=> {
    (async () => {
      const r = await Api.get('/user')
      setInfor(Array(r.data))
    })()
  },[])

  async function handleFile(e){

      if(!e.target.files){
        return;
      }

      const image = e.target.files[0];

      if(!image){
        return;
      }
      if(image.type === 'image/png' || image.type=== 'image/jpeg' || image.type === 'image/jpg'){
        setImagemAvatar(image)
        setAvatarUrl(URL.createObjectURL(e.target.files[0]))
      }
  }

  async function handleAtualizarInfor(e){
    e.preventDefault()

    const data = new FormData()

    if(imagemAvatar !== null || imagemAvatar !== undefined){
      data.append('foto',  imagemAvatar); 
    }
    setLoading(true)
    if (nome.trim() !== '') {
      data.append('nome', nome );
    }
    
    if (acesso.trim() !== '') {
      data.append('acesso', acesso);
    }
    
    if (senha.trim() !== '') {
      data.append('senha', senha);
    }

    await Api.patch('/user/atualizando', data).then( async (r)=> {
      setInfor(Array(r.data))
      setNome('')
      setAcesso('')
      setSenha('')
      setAvatarUrl('')
      setImagemAvatar(null)
      setLoading(false)


    }).catch((err)=> {
      console.log(err.response.data)
      setLoading(false)

    })
  }

  async function handleExcluirConta(){
    await Api.delete('/user/remove')
    .then(()=> {
      localStorage.clear()
      navigate('/')
    }).catch((err)=> {
      console.log(err)
    })
  }
  return (
    <>
    <Header />
    <main className={styles.Container}>
        <h1 style={{color: 'var(--branco)'}}>Configuranção</h1>
        <hr />
          {infor.map((i) => {
            return(
              <>
                <section className={styles.informacao} key={i.id}>
                  {i.foto ? (
                    <img src={`${UrlFoto}${i.foto}`} alt='logoUser' />
                  ): (
                    <img src={Foto} alt='logoUser' />  
                  )}
                  <h2>{i.nome}</h2>
                  <p><strong>Email de recuperação: </strong>{i.email}</p>
                  <p><strong>Acesso: </strong>{i.acesso}</p>
                  <p><strong>Data de nascimento: </strong>{i.data_de_nascimento}</p>
                  <Button onClick={ () => setQuerMesmoApagar(i.id)} id={styles.excluir}>Excluir Conta</Button>
                  <Model isOpen={i.id} id={querMesmoApagar}>
                    <div className={styles.containerExluirConta}>
                      <h3>Você quer mesmo apagar sua conta?</h3>
                      <div>
                        <Button id={styles.confimar} onClick={handleExcluirConta}>Apagar Conta</Button>   
                        <Button onClick={ () => setQuerMesmoApagar(null)} id={styles.excluir}>Cancelar</Button>
                      </div>
                    </div>
                  </Model>
                </section>

                <section className={styles.TrocarInformcao}>
                  <h4 style={{color: 'var(--branco)', fontSize: '30px', marginTop: '1rem'}}>Alterar Informação</h4>
                  <hr />
                  <form className={styles.FormAtualizacao} onSubmit={handleAtualizarInfor}>
                    <label>
                      <span>
                        <FiUpload size={30} color='#fff'/>
                        Alterar foto de perfil
                      </span>
                      <input type="file" accept='image/jpeg' onChange={handleFile}/>
                        {avatarurl && (<img src={ avatarurl } alt='Foto' className={styles.preview}/> )}
                    </label>
                    <Input placeholder={i.nome} value={ nome } onChange={ (v) =>  setNome(v.target.value)}/> <br /> 
                    <Input placeholder={i.acesso} value={ acesso } onChange={ (v) =>  setAcesso(v.target.value)}/> <br />
                    <InputSenha placeholder='Alterer sua senha' value={ senha } onChange={ (v) =>  setSenha(v.target.value)}/>
                    <Button type='submit' disabled={loading}>{loading? 'Carregando...' : 'Atualizar Informações'}</Button>
                  </form>
                </section> 
              </>
            )
          })}
    </main>
    </>
  )
}
