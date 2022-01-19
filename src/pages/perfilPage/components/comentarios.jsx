import React from 'react'
import PropTypes from 'prop-types'
import { List, Grid } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputButton from './../../../components/InputButton'

const comments = [
    {
        imgUrl: "",
        text:"Lorem Ipsum is simply dummy text publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        usuario:"Gastón Capretti"
    },
    {
        imgUrl: "",
        text:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
        usuario:"Tomás serra"
    },
]

const Comentarios = props => {
    const [comentario, setComentario] = React.useState('');
  
    const handleChange = (event) => {
      setComentario(event.target.value);
    };


    return (
        <Grid align="center">
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {
                    comments.map(x => {
                        return (
                            <>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar alt={x.usuario} src={x.imgUrl} />
                                </ListItemAvatar>
                                <ListItemText
                                    secondary={x.text}
                                    primary={x.usuario}
                                />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                            </>
                        )
                    })
                }

                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt="asd" src="asdasd" />
                    </ListItemAvatar>
                    {/* <TextField
                        id="outlined-multiline-flexible"
                        label="Dejar un comentario"
                        multiline
                        maxRows={4}
                        value={comentario}
                        onChange={handleChange}
                        inputProps={{ maxLength: 50 }}
                        /> */}

                        <InputButton />
                </ListItem>
                
            </List>

            
        </Grid>
    )
}

Comentarios.propTypes = {

}

export default Comentarios
