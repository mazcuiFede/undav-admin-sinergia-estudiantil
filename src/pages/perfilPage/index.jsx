import React, { useEffect, useState } from 'react'
import userService from '../../services/user.service'
import Perfil from './components/perfil'
import Comentarios from './components/comentarios'


const PerfilPage = props => {
    
    const [user, setUser] = useState(null)

    useEffect(() => {
        userService.getUserData().then(
          response => {
            setUser(response.user)
          }
        )
      }, [])

    return(
        <>
            {
                user ? 
                <Perfil user={user}/>
                :
                "Cargando..."
            }
            {/* <Comentarios /> */}
        </>
    )
  
}

PerfilPage.propTypes = {

}

export default PerfilPage
