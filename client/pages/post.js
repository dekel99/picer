import React, { useState } from 'react'
import styles from "../styles/post.module.css"
import AddIcon from '@material-ui/icons/Add';
import { TextField, Button } from '@material-ui/core';
import axios from 'axios';
import {useRouter} from 'next/router'
import Loading from '../components/Loading';

var formFile1 = ""
var formFile2 = ""

function post() {

    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [image1, setImage1] = useState()
    const [image2, setImage2] = useState()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()
    const router = useRouter()

    try {var reader = new window.FileReader()} catch{}
    
    // Update img file in client when pick img from device **
    function fileChange(e){

        if (e.target.files[0]){
            const fileVar = e.target.files[0]
            const fileName = fileVar.name
    
            if (fileVar.type.match('image.*')) {
              reader.readAsDataURL(fileVar);
            }

            reader.onload = function(e) {
                if (image1){
                    formFile2 = fileVar
                    setImage2(reader.result)
                } else {
                    formFile1 = fileVar
                    setImage1(reader.result)
                }
            }
        }     
    }

    function sendPost(){
        setLoading(true)
        const data = new FormData() 

        data.append("file", formFile1)
        data.append("file", formFile2)
        data.append("title", title)
        data.append("description", description)

        axios({method: "POST", url: process.env.NEXT_PUBLIC_SERVER_URL + "/post-upload", withCredentials: true , data: data})
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
    }

    return (
        <div>

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
                <label>Post title: </label>
                <TextField onChange={(e) => {setTitle(e.target.value)}} fullWidth={true} id="outlined-basic" type="title" label="Title" variant="outlined" />
                <br/>
                <br/>
                <label>Post description: </label>
                <TextField onChange={(e) => {setDescription(e.target.value)}} fullWidth={true} multiline={true} rows="3" rowsMax="3" id="outlined-basic" type="title" label="Description" variant="outlined" />
            </div>
            <br/>
            <Button onClick={sendPost} style={{color: "#512B58", borderRadius: "8px"}} variant="outlined" color="primary">Post</Button>
            {error && <p style={{color: "red"}}>{error}</p>}
        </div>
    )
}

export default post
