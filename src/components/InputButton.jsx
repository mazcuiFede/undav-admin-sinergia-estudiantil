import PropTypes from 'prop-types'
import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import SubdirectoryArrowLeftIcon from '@mui/icons-material/SubdirectoryArrowLeft';

const InputButton = ({ placeholder }) => {
    return (
        <Paper
          component="form"
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder={placeholder}
            inputProps={{ 'aria-label': 'search google maps' }}
          />

          <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
            <SubdirectoryArrowLeftIcon />
          </IconButton>
          
        </Paper>
    )
}

InputButton.propTypes = {

}

export default InputButton
