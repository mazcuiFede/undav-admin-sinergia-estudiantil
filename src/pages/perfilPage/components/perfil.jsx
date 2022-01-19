import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'moment'
import { Avatar, Grid, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import SchoolIcon from '@mui/icons-material/School';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';

const Perfil = ({user}) => {

    return (
        <Box bgcolor="#B6B5C8" p={2}>
            <Grid container>
                <Grid item xs={6} align="right">
                    <Avatar
                            alt={user.name}
                            src={user.avatarUrl}
                            sx={{ width: 150, height: 150 }}
                        />
                </Grid>
                <Grid item xs={6}>
                    <List dense={true}>
                        <ListItem>
                            <ListItemIcon>
                                <PersonIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary={`${user.nombre} ${user.apellido}`}
                                
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <SchoolIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary={user.carrera}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <EventAvailableIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary={`Fecha registro: ${Moment(user.signupDate).format('YYYY-MM-DD')}`}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <PermContactCalendarIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary={`Fecha última sesión: ${user.lastSession.replace("T", " a las ").split(".")[0]} hs.`}
                            />
                        </ListItem>
                        
                    </List>
                </Grid>
            </Grid>
        </Box>
    )
}

Perfil.propTypes = {

}

export default Perfil
