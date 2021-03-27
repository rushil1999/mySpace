import React, { useState, useEffect } from "react";
import { DropzoneDialog } from "material-ui-dropzone";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { CircularProgress } from "@material-ui/core";
import { storage } from "../services/firebaseConfig";
import firebase from "firebase";

function DropZone(props) {
  const [files, setFiles] = useState([]);
  const [openState, setOpenState] = useState(false);
  const [loading, setLoading] = useState(false);

  const [progress, setProgress] = useState(0);
  const [errorArray, setErrorArray] = useState([]);
  const [urlArray, setUrlArray] = useState([]);
  const handleClose = () => {
    setOpenState(false);
  };

  const handleSave = (files) => {
    setLoading(true);
    setFiles(files);
    console.log(files);
    setOpenState(false);
  };

  useEffect(() => {
    console.log("Called Use Effect");
    let tempUrlArray = [];
    let tempErrorArray = [];
    files.map((file, index) => {
      console.log("File Name", file.name);
      const storageRef = storage.ref();
      const fileRef = storageRef.child(file.name);
      const uploadTask = fileRef.put(file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log("Upload is paused");
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
          console.log(error);
          tempErrorArray.push(error);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log("File available at", downloadURL);
            tempUrlArray.push(downloadURL);
          });
        }
      );
      storageRef.put(file).on(
        "state_changed",
        (snap) => {
          let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
          setProgress(percentage);
        },
        (err) => {
          let tempErrorArray = errorArray;
          tempErrorArray.push(err);
          setErrorArray(tempErrorArray);
        },
        async () => {
          const url = await storageRef.getDownloadURL();
          let tempUrlArray = urlArray;
          tempUrlArray.push(url);
          setUrlArray(tempUrlArray);
        }
      );
    });
  }, [files, errorArray, urlArray]);

  useEffect(() => {
    if (errorArray.length > 0) {
    }
  }, [urlArray, errorArray]);

  const handleOpen = () => {
    setOpenState(true);
  };

  return (
    <div>
      <Button onClick={handleOpen}>
        <CloudUploadIcon />
      </Button>
      {loading ? <CircularProgress /> : null}
      <DropzoneDialog
        open={openState}
        onSave={handleSave}
        acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
        showPreviews={true}
        maxFileSize={5000000}
        onClose={handleClose}
      />
    </div>
  );
}

export default DropZone;
