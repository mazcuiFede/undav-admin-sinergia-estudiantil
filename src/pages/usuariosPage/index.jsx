import React from "react"
import { useEffect, useState } from "react"
import userService from "../../services/user.service"
import { Button, Grid, Paper, Avatar, Typography, Box } from "@mui/material"
import TableUsuarios from "./components/tableUsuarios"
import CircularProgress from "@mui/material/CircularProgress"

const UsuariosPage = (props) => {
  const [usuarios, setUsuarios] = useState(null)

  useEffect(() => {
    obtenerUsuarios()
  }, [])

  const obtenerUsuarios = () => {
    userService.getUsuarios().then((response) => {
      setUsuarios(response.user)
    })
  }

  const handleChangeStatus = (id, newValue) => {
    setUsuarios(null)
    userService.putUserStatus(id, newValue).then(() => {
      obtenerUsuarios()
    })
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h4" mb={4}>
          Usuarios
        </Typography>
        {usuarios ? (
          <TableUsuarios
            usuarios={usuarios}
            handleChangeStatus={handleChangeStatus}
          />
        ) : (
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        )}
      </Grid>
    </Grid>
  )
}

export default UsuariosPage
