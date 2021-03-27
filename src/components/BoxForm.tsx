import React from 'react';
import TextField from '@material-ui/core/TextField';
import DropZone from './Upload';

function BoxForm(props: any) {
    return(
    <form>
        <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Box Name"
            fullWidth
        />
        <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Box Desc"
            fullWidth
        />
    </form>
    ); 
}

export default BoxForm;