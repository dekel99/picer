import React from 'react'
import styles from "../styles/post.module.css"
import AddIcon from '@material-ui/icons/Add';
import { TextField, Button } from '@material-ui/core';


function post() {
    return (
        <div>
            <div className={styles.uploadsContainer}>
                <div className={styles.picUploadSecondary}></div>
                <div className={styles.picUpload}><AddIcon style={{ fontSize: 100 }} /></div>
            </div>
            <br/>
            
            <div className={styles.inputsContainer}>
                <label>Post title: </label>
                <TextField fullWidth="true" id="outlined-basic" type="title" label="Title" variant="outlined" />
                <br/>
                <br/>
                <label>Post description: </label>
                <TextField fullWidth="true" multiline="true" rows="3" rowsMax="3" id="outlined-basic" type="title" label="Description" variant="outlined" />
            </div>
            <br/>
            <Button variant="outlined" color="primary">Post</Button>
        </div>
    )
}

export default post
