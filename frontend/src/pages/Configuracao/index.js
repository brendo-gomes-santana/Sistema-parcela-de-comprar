import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import styles from './style.module.scss'

import Button from '../../components/Button'
import Input from '../../components/Input'
import InputSenha from '../../components/InputSenha'
import Model from '../../components/Model'

import Api, { UrlFoto } from '../../service/Api'

import user from '../../imgs/user.jpg'

import { FiUpload } from 'react-icons/fi';
import { Conversor } from '../../service/ConversorDeIMG'

export default function Configuracao() {

  const [infor, setInfor] = useState([])
  const [querMesmoApagar, setQuerMesmoApagar] = useState(null)

  const [avatarurl, setAvatarUrl] = useState('')
  const [imagemAvatar, setImagemAvatar] = useState(null)


  const [nome, setNome] = useState('')
  const [acesso, setAcesso] = useState('')
  const [senha, setSenha] = useState('')

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
      console.log(e.target.files)
      
      const image = e.target.files[0];

      if(!image){
        return;
      }

      if(image.type === 'image/jpeg' || image.type === 'image/png' || image.type === 'image/jpg'){
        setImagemAvatar(image)
        setAvatarUrl(URL.createObjectURL(e.target.files[0]))
      }
  }

  async function handleAtualizarInfor(e){
    e.preventDefault()

    const foto = await Conversor(user);

    const data = new FormData()

    data.append('foto',  imagemAvatar !== null ? imagemAvatar : foto);

    
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

    }).catch((err)=> {
      console.log(err.response.data)
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
                  <img src={`${UrlFoto}${i.foto}`} alt='logoUser' />
                  <h2>{i.nome}</h2>
                  <p><strong>Email de recuperação: </strong>{i.email}</p>
                  <p><strong>Acesso: </strong>{i.acesso}</p>
                  <p><strong>Data de nascimento: </strong>{i.data_de_nascimento}</p>
                  <Button onClick={ () => setQuerMesmoApagar(i.id)} id={styles.excluir}>Excluir Conta</Button>
                  <Model isOpen={i.id} id={querMesmoApagar}>
                    <div className={styles.containerExluirConta}>
                      <h3>Você quer mesmo apagar sua conta?</h3>
                      <div>
                        <Button id={styles.confimar}>Apagar Conta</Button>   
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
                      <input type="file" accept='image/jpg, image/jpeg' onChange={handleFile}/>
                        {avatarurl && (<img src={ avatarurl } alt='Foto' className={styles.preview}/> )}
                    </label>
                    <Input placeholder={i.nome} value={ nome } onChange={ (v) =>  setNome(v.target.value)}/>
                    <Input placeholder={i.acesso} value={ acesso } onChange={ (v) =>  setAcesso(v.target.value)}/>
                    <InputSenha placeholder='Alterer sua senha' value={ senha } onChange={ (v) =>  setSenha(v.target.value)}/>
                    <Button type='submit'>Atualizar Informações</Button>
                  </form>
                </section>  
              </>
            )
          })}
    </main>
    </>
  )
}
