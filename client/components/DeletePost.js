import React, { useState } from 'react'
// import axios from 'axios';
import { useAxios } from '../hooks/useAxios';
import {useRouter} from 'next/router'
import Loading from './Loading';
import Portal from './Portal';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Button from '@material-ui/core/Button';
import styles from "../styles/deletePost.module.css"


function DeletePost(props) {
    const [axios] = useAxios()
    const [isDeleteWindow, setIsDeleteWindow] = useState(false)
    const [loading, setLoading] = useState(false)
    const { postId, loadMyPosts } = props

    function deleteWindowHandler(){
        setIsDeleteWindow(!isDeleteWindow)
    }

    function deletePost(){
        setLoading(true)
        axios({method: "GET", url: process.env.NEXT_PUBLIC_SERVER_URL + "/delete-post/" + postId, withCredentials: true})
            .then( res => {
                if(res.data==="Post deleted"){
                    setIsDeleteWindow(!isDeleteWindow)
                    setLoading(false)
                    loadMyPosts()
                }
            }).catch(err => {
                setLoading(false)
            })
    }

    return (
        <div>
            {isDeleteWindow && 
            <Portal portalId="delete"> 
                {loading && <Loading loading={loading}/>}
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
