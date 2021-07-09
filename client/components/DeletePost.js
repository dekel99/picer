import React, { useState } from 'react'
import axios from 'axios';
import Loading from './Loading';
import Portal from './Portal';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Button from '@material-ui/core/Button';
import styles from "../styles/deletePost.module.css"


function DeletePost(props) {

    const [isDeleteWindow, setIsDeleteWindow] = useState(false)
    const [loading, setLoading] = useState(false)
    const { postId } = props

    function deleteWindowHandler(){
        console.log(isDeleteWindow)
        setIsDeleteWindow(!isDeleteWindow)
    }

    function deletePost(){
        setLoading(true)
        axios({method: "GET", url: process.env.NEXT_PUBLIC_SERVER_URL + "/delete-post/" + postId, withCredentials: true})
            .then( res => {
                if(res.data==="Post deleted"){
                    setIsDeleteWindow(!isDeleteWindow)
                    setLoading(false)
                }
            }).catch(err => {
                setLoading(false)
            })
    }

    return (
        <div>
            {loading && <Loading loading={loading}/>}
            {isDeleteWindow && 
            <Portal portalId="delete"> 
                <div onClick={deleteWindowHandler} className={styles.windowContainer}>
                    <div className={styles.deleteWindow}>
                        <p className={styles.windowHeading}>Are you sure?</p>
                        <hr/>
                        <p className={styles.windowText}>once the you click <span style={{fontWeight: "600"}}>delete</span> you will lose all post data</p>
                        
                        <div className={styles.btnsContainer}>
                            <div className={styles.cancelBtn}>
                                <Button onClick={deleteWindowHandler}>Cancel</Button >
                            </div>

                            <div className={styles.deleteBtn}>
                                <Button style={{color: "red"}} onClick={deletePost}>Delete</Button >
                            </div>
                        </div>

                    </div>
                </div>
            </Portal>}

            <div className={styles.deleteIcon} onClick={deleteWindowHandler}>
                <DeleteOutlineIcon  />
            </div>
        </div>
    )
}

export default DeletePost
