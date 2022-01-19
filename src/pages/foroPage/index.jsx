import React from 'react'
import PropTypes from 'prop-types'
import { Button, Grid, Paper, Avatar, Typography , Box } from '@mui/material'
import logo from '../../assets/img/logo.png'
import TablePreguntas from './components/tablePreguntas'
import { useEffect, useState } from 'react'
import dudasService from '../../services/dudas.service'

const ForoPage = props => {

    const [dudas, setDudas] = useState(null)

    useEffect( () => {
        obtenerDudas()
    }, [])

    const obtenerDudas = () => {
        dudasService.getDudas().then(
            response => {
                setDudas(response)
            }
        )
    }
    
    const deletePregunta = (id) => {
        debugger
        dudasService.deleteDuda(id).then(
            response => {
                obtenerDudas()
            }
        )
    }

    return (
        <Grid container>
            <Grid item xs={12}>
                {
                    dudas ? 
                    <TablePreguntas dudas={dudas.duda} deletePregunta={deletePregunta}/>
                    :
                    "Cargando..."
                }
            </Grid>
        </Grid>
    )
}

ForoPage.propTypes = {

}

export default ForoPage
