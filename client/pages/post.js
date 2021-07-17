import React, { useState } from 'react'
import ImageCropper from "../components/ImageCropper"
import AddIcon from '@material-ui/icons/Add';
import { TextField, Button } from '@material-ui/core';
import DropMenu from '../components/DropMenu';
import axios from 'axios';
import {useRouter} from 'next/router'
import Loading from '../components/Loading';
import styles from "../styles/post.module.css"

function post() {

    const [title, setTitle] = useState("Overall best picture")
    const [description, setDescription] = useState()
    const [image1, setImage1] = useState()
    const [image2, setImage2] = useState()
    const [loading, setLoading] = useState(false)
    const [cropWindow, setCropWindow] = useState(false)
    const [error, setError] = useState()

    const router = useRouter()
    try {var reader = new window.FileReader()} catch{}

    // Triggers when cropped image choose, convert blobUrl to base64
    function croppedImageResults(croppedImg){
        var xhr = new XMLHttpRequest;
        xhr.responseType = 'blob';
        
        xhr.onload = function() {
            var recoveredBlob = xhr.response;
        
            reader.onload = function() {
                image2 ? setImage2(reader.result) : setImage1(reader.result)
            };
        
            reader.readAsDataURL(recoveredBlob);
        };
        
        xhr.open('GET', croppedImg);
        xhr.send();

        setCropWindow(false)
    }
    
    // Update img file in client when pick img from device **
    function fileChange(e){

        if (e.target.files[0]){
            const fileVar = e.target.files[0]
    
            if (fileVar.type.match('image.*')) {
              reader.readAsDataURL(fileVar);
            }

            reader.onload = function(e) {
                if (image1){
                    setImage2(reader.result)
                    setCropWindow(true)
                } else {
                    setImage1(reader.result)
                    setCropWindow(true)
                }
            }
        }     
    }

    function sendPost(){
        setLoading(true)
        const data = new FormData() 
        data.append("file", image1)
        data.append("upload_preset", "hpuuk4oa")

        axios.post("https://api.cloudinary.com/v1_1/ddijwyj2m/image/upload", data)
            .then(res => {
                if(res.statusText==="OK"){
                    const urlImage1 = res.data.secure_url
                    const data = new FormData() 
                    data.append("file", image2)
                    data.append("upload_preset", "hpuuk4oa")

                    axios.post("https://api.cloudinary.com/v1_1/ddijwyj2m/image/upload", data)
                        .then(res => {
                            if(res.statusText==="OK"){
                                const urlImage2 = res.data.secure_url
                                const postData = {title, description, urlImage1, urlImage2}
                        
                                axios({method: "POST", url: process.env.NEXT_PUBLIC_SERVER_URL + "/post-upload", withCredentials: true , data: postData})
                                    .then(res=> {
                                        if (res.data==="ok"){
                                            setLoading(false)
                                            router.push("/vote")
                                        } else {
                                            throw Error (res.data)
                                        }
                                    }).catch(err => {
                                        setError(err.message)
                                        setLoading(false)
                                    })
                            } else {
                                setError("Error ocurred while uploading")
                                setLoading(false)
                            }
                        }).catch(err => console.log(err))
                } else {
                    setError("Error ocurred while uploading")
                    setLoading(false)
                }
            }).catch(err => console.log(err))

    }

    function voteFor(item){
        setTitle(item)
    }

    return (
        <div>
            {cropWindow && <ImageCropper croppedImageResults={croppedImageResults} image={image2 ? image2 : image1}/>}
            <Loading loading={loading}/>

            <div className={styles.uploadsContainer}>
                <div className={styles.picUploadSecondary} style={image1 && {backgroundColor: 'white'} }>
                    {image1 ? image2 ?
                    <div className={styles.imgPreview} style={{backgroundImage: 'url(' + image2 + ')'}}/>:
                    <div className={styles.addIcon}>
                        <input hidden id="imageUpload" type='file' accept=".png, .jpg, .jpeg" onChange={fileChange}/>
                        <label htmlFor="imageUpload"><AddIcon style={{ fontSize: 100 }} /></label> 
                    </div>: null}
                </div>

                <div className={styles.picUpload}>
                    {image1 ? 
                    <div className={styles.imgPreview} style={{backgroundImage: 'url(' + image1 + ')'}}/> : 

                    <div className={styles.addIcon}>
                        <input hidden id="imageUpload" type='file' accept=".png, .jpg, .jpeg" onChange={fileChange}/>
                        <label htmlFor="imageUpload"><AddIcon style={{ fontSize: 100 }} /></label>
                    </div>}
                </div>
            </div>
            <br/>
            
            <div className={styles.inputsContainer}>
                <p style={{marginBottom: "10px"}}>People will vote for: </p>

                <DropMenu voteFor={voteFor} />
                <br/>
                <p style={{margin: "10px"}}>Add a note (optional)</p>
                <TextField onChange={(e) => {setDescription(e.target.value)}} fullWidth={true} multiline={true} rows="3" rowsMax="3" id="outlined-basic" type="title" label="For example: Wich hat look better?" variant="outlined" />
            </div>
            <br/>
            <Button onClick={sendPost} variant="outlined" color="primary">Post</Button>
            {error && <p style={{color: "red"}}>{error}</p>}
        </div>
    )
}

export default post
