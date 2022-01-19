import React from 'react'
import PropTypes from 'prop-types'
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/img/logo.png'
import { Button, Grid, Paper, Avatar } from '@mui/material'
import { Link } from "react-router-dom";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import userService from '../../services/user.service';

const carreras = [
    "Licenciatura en Ciencias Ambientales",
    "Ingeniería Informática",
    "Licenciatura en Actividad Física y Deporte",
    "Licenciatura en Gestión Cultural",
    "Licenciatura en Periodismo",
    "Licenciatura en Enfermería",
    "Licenciatura en Artes Audiovisuales",
    "Licenciatura en Guiado de Viajes y Turismo"
]

const RegistrarsePage = props => {
    const navigate = useNavigate();
    
    const [nombre, setNombre] = React.useState("");
    const [apellido, setApellido] = React.useState("");
    const [documento, setDocumento] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [avatarUrl, setAvatarUrl] = React.useState("");
    const [carrera, setCarrera] = React.useState('');

    const handleChangeCarrera = (event) => {setCarrera(event.target.value);};
    const handleChangeNombre = (event) => {setNombre(event.target.value);};
    const handleChangeApellido = (event) => {setApellido(event.target.value);};
    const handleChangeDocumento = (event) => {setDocumento(event.target.value);};
    const handleChangePassword = (event) => {setPassword(event.target.value);};
    const handleChangeAvatarUrl = (event) => {setAvatarUrl(event.target.value);};

    const registrarme = () => {

        const estudiante = { 
            nombre, apellido, documento, password, avatarUrl, carrera
        }
        
        userService.register(estudiante).then(
            response => {
                debugger
                localStorage.setItem('token', response.token)
                navigate("/principal");
            },
            error => {

            }
        )
    }

    return (
        <>
            <Grid>
                <Paper elevation={10} style={{ padding: 20, width: 350, margin: "90px auto"}}>
                    <Grid align='center' mb={3}>
                        <Avatar alt="UNDAV" src={logo} sx={{width: 280, height: 184}} variant="rounded"/>
                    </Grid>
                    <Grid align='center' mb={3}>
                        <Stack spacing={2}>
                            <TextField onChange={handleChangeNombre} id="nombre" label="Nombre" name="Nombre" variant="outlined" />
                            <TextField onChange={handleChangeApellido} id="apellido" label="Apellido" variant="outlined" />
                            <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Carrera</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={carrera}
                                    label="Age"
                                    onChange={handleChangeCarrera}
                                >
                                    {
                                        carreras.map((carrera, i) => {
                                            return <MenuItem value={carrera} key={i}>{carrera}</MenuItem>
                                        })
                                    }

                                </Select>
                            </FormControl>
                            <TextField onChange={handleChangeDocumento} id="documento" label="Nro. de documento" variant="outlined" type="number"/>
                            <TextField onChange={handleChangePassword} id="password" label="Password" type="password" />
                            <TextField onChange={handleChangeAvatarUrl} id="avatarUrl" label="Link Imagen de Perfil" variant="outlined" />
                            
                        </Stack>
                    </Grid>
                    <Grid align='center' mb={3} mt={3}>
                        <Button variant="contained" onClick={registrarme}>Registrarme</Button>
                    </Grid>
                    <Grid align='center' mb={3} >
                        Ya tenés cuenta? <Link to="/login">Iniciar Sesión</Link>
                    </Grid>
                </Paper>
            </Grid>
        </>
    )
}

RegistrarsePage.propTypes = {

}

export default RegistrarsePage
