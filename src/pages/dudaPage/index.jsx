import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useParams } from "react-router-dom";
import Comments from '../../components/Comments';
// import data from "../../components/Comments/data.json"
import dudasService from '../../services/dudas.service';
import DudaDetalle from './components/dudaDetalle'
import CircularProgress from '@mui/material/CircularProgress';
import { Box, Button, Grid, Chip } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from "react-router-dom";


const DudaPage = props => {
    const { id } = useParams();
    const [duda, setDuda] = useState(null)

    useEffect(() => {
        dudasService.getDudaById(id).then(
            response => {
                setDuda(response.duda)
            },
            error => {

            }
        )
    }, [])       

    return (
        <div>
            <Grid container>
                <Grid item xs={6}>
                    <Link to={"/dudas"}>
                        <Button variant="outlined" startIcon={<ArrowBackIcon />}>
                            Volver
                        </Button>
                    </Link>
                </Grid>
                <Grid item xs={6} align={"right"}>
                    <Link to="/hacer-pregunta">
                        <Button variant="contained">Hacer una pregunta</Button>
                    </Link>
                </Grid>
                <Grid item xs={12} mt={3}>
                    {
                        duda ?
                        <DudaDetalle duda={duda}/>
                        :
                        <CircularProgress />
                    }
                </Grid>
                <Grid item xs={12}>
                    {
                        duda ? 
                        <Comments data={duda.comentarios} idcomentario={id}/>
                        : 
                        <CircularProgress />
                    }
                </Grid>

            </Grid>
        </div>
    )
}

DudaPage.propTypes = {

}

export default DudaPage
