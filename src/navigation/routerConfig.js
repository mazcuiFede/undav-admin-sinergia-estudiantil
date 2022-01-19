import {Routes, Route} from 'react-router-dom'
import { ROOT, LOGIN, REGISTRARSE, PRINCIPAL, FORO,
         EVENTOS, PERFIL, PEDIDOSADMIN  } from './../constants/url'
import { Layout } from '../components/Layout'
import PrivateRoute from '../components/PrivateRoute';

import LoginPage from '../pages/loginPage'
import RegistrarsePage  from '../pages/registrarsePage'
import PrincipalPage  from '../pages/principalPage'
import EventosPage  from '../pages/eventosPage'
import PerfilPage from '../pages/perfilPage'
import ForoPage from '../pages/foroPage'
import AdminPedidosPage from '../pages/adminPedidosPage'


export const RouterConfig = () => {
    return (
        <Routes>
            {/* <Route path={ROOT} element={<PrivateRoute><PrivateRoute><Layout /></PrivateRoute>}/> */}
            <Route path={LOGIN} element={<LoginPage /> }/>
            <Route path={REGISTRARSE} element={<RegistrarsePage />} />

            <Route path={ROOT} element={<PrivateRoute><Layout children={<PrincipalPage />}/></PrivateRoute>} />
            <Route path={PRINCIPAL} element={<PrivateRoute><Layout children={<PrincipalPage />}/></PrivateRoute>} />
            
            <Route path={EVENTOS} element={<PrivateRoute><Layout children={<EventosPage />}/></PrivateRoute>} />
            <Route path={FORO} element={<PrivateRoute><Layout children={<ForoPage />}/></PrivateRoute>} />
            <Route path={PEDIDOSADMIN} element={<PrivateRoute><Layout children={<AdminPedidosPage />}/></PrivateRoute>} />
            <Route path={PERFIL} element={<PrivateRoute><Layout children={<PerfilPage />}/></PrivateRoute>} />
            {/* <Route path={SUBIR_CONTENIDO} element={<PrivateRoute><Layout children={<SubirContenidoPage />}/></PrivateRoute>} /> */}
            
        </Routes>
    )
}

export default RouterConfig