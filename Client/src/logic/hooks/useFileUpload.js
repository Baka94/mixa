import { useRef, useState } from "react"
import axios from "axios";

export const useFileUpload = inputRef => {

    const [file, setFile] = useState();
    const [data, getFile] = useState({name:"", path:""});
    const [progress, setProgress] = useState(0);
    const el = useRef();

    const handleInputChange = (e) => {
        setProgress(0)
        const file = e.target.files[0];
        console.log(file);
        setFile(file);
    }

    const uploadFile = () =>{
        const formData = new FormData();
        formData.append('file', file);
        axios.post("http://localhost:5000/upload/", formData, {
            onUploadProgress: (ProgressEvent) =>{
                let progress = Math.round(ProgressEvent.loaded / ProgressEvent.total * 100) + '%';
                setProgress(progress);
            }
        }).then(res => {
            console.log(res);
            getFile({
                name: res.data.name,
                path: 'http://localhost:5000' + res.data.path
            })
            el.current.value = null;
        }).catch(err => console.log(err))
    }

    const bind = {
        ref: el,
        onChange: handleInputChange
    }


  return [ progress, data, bind, uploadFile ]
}