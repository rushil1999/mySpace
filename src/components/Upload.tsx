import React, {  useState } from 'react'
import {DropzoneDialog} from 'material-ui-dropzone'
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';



function DropZone(props: any) {
    const [files, setFiles ] = useState<Array<File>>([]);
    const [openState, setOpenState] = useState(false);

    const handleClose = () => {
        setOpenState(false);
    }

    const handleSave = (files: Array<File>) => {
        setFiles(files);
        setOpenState(false);
    }

    const handleOpen = () => {
        setOpenState(true);
    }

    return (
        <div>
            <Button onClick={handleOpen}>
              <CloudUploadIcon/>
            </Button>
            <DropzoneDialog
                open={openState}
                onSave={handleSave}
                acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                showPreviews={true}
                maxFileSize={5000000}
                onClose={handleClose}
            />
        </div>
    );

}

export default DropZone