import React from 'react'
import PropTypes from 'prop-types'
import { Button, Grid, Paper, Avatar, Typography , Box } from '@mui/material'
import logo from '../../assets/img/logo.png'
import TableDudas from './components/tableDudas'
import { useEffect, useState } from 'react'
import dudasService from '../../services/dudas.service'

const DudasPage = props => {

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
    
    const deleteDuda = (id) => {
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
                    <TableDudas dudas={dudas.duda} deleteDuda={deleteDuda}/>
                    :
                    "Cargando..."
                }
            </Grid>
        </Grid>
    )
}

DudasPage.propTypes = {

}

export default DudasPage
