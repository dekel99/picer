import React, { useState } from 'react'
import styles from "../styles/post.module.css"
import AddIcon from '@material-ui/icons/Add';
import { TextField, Button } from '@material-ui/core';
import axios from 'axios';


function post() {
    
    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [image1, setImage1] = useState()
    // var reader = new FileReader();


    function sendPost(){
        const data = {title: title, description: description}

        axios.post(process.env.NEXT_PUBLIC_SERVER_URL + "/post", data).then(res=> { console.log(res)}).catch(err => {console.log(err)})
    }

    // Update img file in client when pick img from device **
    function fileChange(e){

        if (e.target.files[0]){
            const fileVar = e.target.files[0]
            const fileName = fileVar.name
    
            if (fileVar.type.match('image.*')) {
              reader.readAsDataURL(fileVar);
            }

            reader.onload = function (e) {
              setImage1(reader.result)
            }
        }     
    }


    return (
        <div>
            <div className={styles.uploadsContainer}>
                <div className={styles.picUploadSecondary}></div>
                <div className={styles.picUpload}>
                    <div className={styles.addIcon}>
                        {image1 ? <div style={{backgroundImage: 'url(' + image1 + ')'}}></div> : <div>
                            <input hidden id="imageUpload" type='file' accept=".png, .jpg, .jpeg" onChange={fileChange}/>
                            <label for="imageUpload"><AddIcon style={{ fontSize: 100 }} /></label>
                        </div>}
                    </div>
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
