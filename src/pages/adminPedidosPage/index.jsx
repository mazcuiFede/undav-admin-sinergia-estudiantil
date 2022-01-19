import React from 'react'
import PropTypes from 'prop-types'
import { Button, Grid, Paper, Avatar, Typography , Box } from '@mui/material'
import logo from '../../assets/img/logo.png'
import TablePreguntas from './components/tablePreguntas'
import { useEffect, useState } from 'react'
import dudasService from '../../services/user.service'

const AdminPedidosPage = props => {

    const [pedidos, setPedidos] = useState(null)

    useEffect( () => {
        obtenerPedidos()
    }, [])

    const obtenerPedidos = () => {
        dudasService.getDudas().then(
            response => {
                setDudas(response)
            }
        )
    }
    
    const deletePedido = (id) => {
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
                    <TablePedidos dudas={dudas.duda} deletePedido={deletePedido}/>
                    :
                    "Cargando..."
                }
            </Grid>
        </Grid>
    )
}

AdminPedidosPage.propTypes = {

}

export default AdminPedidosPage