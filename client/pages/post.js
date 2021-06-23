import React, { useState } from 'react'
import styles from "../styles/post.module.css"
import AddIcon from '@material-ui/icons/Add';
import { TextField, Button } from '@material-ui/core';
import axios from 'axios';
import {useRouter} from 'next/router'



const defaultUserPic = "https://www.biiainsurance.com/wp-content/uploads/2015/05/no-image.jpg"
let fileName = ""
var formFile1 = ""
var formFile2 = ""

function post() {

    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [image1, setImage1] = useState()
    const [image2, setImage2] = useState()
    const [loading, setLoading] = useState(false)
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

        axios.post(process.env.NEXT_PUBLIC_SERVER_URL + "/post-upload", data)
            .then(res=> { 
                if (res.data==="ok"){
                    setLoading(false)
                    router.push("/vote")
                }
            }).catch(err => {
                console.log(err) 
                setLoading(false)
            })
    }



    return (
        <div>
            {loading && 
            <div className={styles.pageContainerLoading}>
                <div className={styles.loading}>
                    <lottie-player src="https://assets1.lottiefiles.com/packages/lf20_Stt1R6.json"  background="transparent"  speed="1"  style={{width: "50px", height: "50px"}}  loop  autoplay></lottie-player>
                </div>
            </div>}

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
            <Button onClick={sendPost} variant="outlined" color="primary">Post</Button>
        </div>
    )
}

export default post
