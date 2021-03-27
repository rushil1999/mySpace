import React , {useState } from 'react';
import TextField from '@material-ui/core/TextField';
import DropZone from './Upload';

const BoxForm= (props: any) => {
    const [state, setState] = useState({
		name: '',
		description: '',
	});
	
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