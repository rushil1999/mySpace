import {useState, useEffect} from 'react';
import {storage } from './firebaseConfig';

const StoreFiles = (files) => {
    const[progress, setProgress] = useState(0);
    const[errorArray, setErrorArray] = useState(null);
    const[urlArray, setUrlArray] = useState(null);

    useEffect(()=>{
        files.map((file, index) => {
            const storageRef = storage.ref(file.name);
            storageRef.put(file).on('state_changed', (snap) => {
                let percentage = (snap.bytesTransferred / snap.totalBytes)*100;
                setProgress(percentage);
            }, (err) => {
                setErrorArray(errorArray.push(err));
            },async () => {
                const url = await storageRef.getDownloadURL();
                setUrlArray(urlArray.push(url));
            })
        })
        
    }, [files]);
    
    return {progress, urlArray, errorArray }
}

export default StoreFiles;