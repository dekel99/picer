import React from 'react'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import styles from "../styles/deletePost.module.css"

function DeletePost() {

    function deletePost(){

    }

    return (
        <div className={styles.deleteIcon}>
            <button onClick={deletePost}>
                <DeleteOutlineIcon fontSize="large" />
            </button>
        </div>
    )
}

export default DeletePost
