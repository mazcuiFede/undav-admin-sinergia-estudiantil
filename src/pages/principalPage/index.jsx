import React from 'react'
import PropTypes from 'prop-types'
import { Button, Grid, Paper, Avatar, Typography , Box } from '@mui/material'
import logo from '../../assets/img/logo.png'

const PrincipalPage = props => {
    return (
        <Grid>
        <Paper elevation={10} style={{ padding: 20, width: 650, margin: "10px auto"}}>
            <Grid align='center' mb={3}>
                    <Avatar alt="UNDAV" src={logo} sx={{width: 280, height: 184}} variant="rounded"/>
            </Grid>
            <Grid align="center">
                <Box mt={5}>
                    <Typography paragraph={true} variant={"h3"}>Plataforma de administración</Typography>   
                </Box>
            </Grid>
            </Paper>
        </Grid>
    )
}

PrincipalPage.propTypes = {

}

export default PrincipalPage
