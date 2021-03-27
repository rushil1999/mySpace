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
            label="Name"
            fullWidth
        />
        <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Description"
            fullWidth
        />
    </form>
    ); 
}

export default BoxForm;