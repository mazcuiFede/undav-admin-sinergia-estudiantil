import React from 'react'
import PropTypes from 'prop-types'
import { List, Grid, Divider } from '@mui/material';
import Moment from 'moment'
import { Box, Stack, Typography, Chip } from '@mui/material';
import { Link } from "react-router-dom";

const DudaDetalle = props => {
    const { duda } = props
    console.log(duda)

    return (
        <Grid container>
            <Grid item xs={12}>
                <Typography variant={"h4"} paragraph={true}>
                    {duda.titulo}          
                </Typography>
                <Typography paragraph={true}>
                    Pregunta realizada el día: {Moment(duda.createdAt).format('YYYY-MM-DD HH:MM')}hs.
                </Typography>
            </Grid>
            
            <Grid item xs={12}>
                <Divider />
            </Grid>
            <Grid item xs={12}>
                <Box pt={3} pb={5}>
                    <Typography paragraph={true}>
                        {duda.descripcion}
                    </Typography>
                    <Typography>
                        <b>Tags:  </b>
                        <Stack direction="row" spacing={1} mt={1}>
                        
                            {
                                duda.tags.map(tag => 
                                    <Chip label={tag} variant="outlined" />
                                )
                            }
                        </Stack>
                    </Typography>
                </Box>
            </Grid>

              
            
        </Grid>
    )
}

DudaDetalle.propTypes = {

}

export default DudaDetalle