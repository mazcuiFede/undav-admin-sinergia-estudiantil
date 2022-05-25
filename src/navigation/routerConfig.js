import { Routes, Route } from "react-router-dom"
import {
  ROOT,
  LOGIN,
  PRINCIPAL,
  DUDAS,
  EVENTOS,
  PERFIL,
  USUARIOS,
  FORO_DUDA,
} from "./../constants/url"
import { Layout } from "../components/Layout"
import PrivateRoute from "../components/PrivateRoute"

import LoginPage from "../pages/loginPage"
import PrincipalPage from "../pages/principalPage"
import EventosPage from "../pages/eventosPage"
import PerfilPage from "../pages/perfilPage"
import DudasPage from "../pages/dudasPage"
import UsuariosPage from "../pages/usuariosPage"
import DudaPage from "../pages/dudaPage"

export const RouterConfig = () => {
  return (
    <Routes>
      {/* <Route path={ROOT} element={<PrivateRoute><PrivateRoute><Layout /></PrivateRoute>}/> */}
      <Route path={LOGIN} element={<LoginPage />} />

      <Route
        path={ROOT}
        element={
          <PrivateRoute>
            <Layout children={<PrincipalPage />} />
          </PrivateRoute>
        }
      />
      <Route
        path={PRINCIPAL}
        element={
          <PrivateRoute>
            <Layout children={<PrincipalPage />} />
          </PrivateRoute>
        }
      />

      <Route
        path={EVENTOS}
        element={
          <PrivateRoute>
            <Layout children={<EventosPage />} />
          </PrivateRoute>
        }
      />
      <Route
        path={DUDAS}
        element={
          <PrivateRoute>
            <Layout children={<DudasPage />} />
          </PrivateRoute>
        }
      />
      <Route
        path={FORO_DUDA}
        element={
          <PrivateRoute>
            <Layout children={<DudaPage />} />
          </PrivateRoute>
        }
      />
      <Route
        path={USUARIOS}
        element={
          <PrivateRoute>
            <Layout children={<UsuariosPage />} />
          </PrivateRoute>
        }
      />
      <Route
        path={PERFIL}
        element={
          <PrivateRoute>
            <Layout children={<PerfilPage />} />
          </PrivateRoute>
        }
      />
      {/* <Route path={SUBIR_CONTENIDO} element={<PrivateRoute><Layout children={<SubirContenidoPage />}/></PrivateRoute>} /> */}
    </Routes>
  )
}

export default RouterConfig
