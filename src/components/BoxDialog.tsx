import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DropZone from './Upload';
import BoxForm  from './BoxForm';

export default function BoxDialog(props: any) {
    const { handlerFunction } = props;

  return (
    <div>
      <Dialog open={true} onClose={handlerFunction} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Box Details</DialogTitle>
        <DialogContent>
            <BoxForm></BoxForm>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlerFunction} color="primary">
            Cancel
          </Button>
          <Button onClick={handlerFunction} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
