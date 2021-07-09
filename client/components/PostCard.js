import React, { useEffect, useState } from 'react'
import VoteResult from './VoteResult';
import axios from 'axios';
import Pause from './Pause';
import DeletePost from './DeletePost';
import Card from '@material-ui/core/Card';
import styles from "../styles/postCard.module.css"

function PostCard(props) {

    const [votesUpdate, setVotesUpdate] = useState()
    const {name, images, title, description, time, votes, index, postId, voteClicked, deletePost, active} = props

    if(voteClicked){
        axios({method: "GET", url: process.env.NEXT_PUBLIC_SERVER_URL + "/get-results/" + postId , withCredentials:true})
        .then(res => {
            if(res.data){
                setVotesUpdate(res.data)
                props.clicked()
            }
        })
    }

    return (
        <div>
            <div className={styles.cardContainer}>
                <Card style={{backgroundColor: "transparent", boxShadow: "none"}}>
                    <div className={styles.cardHeader}>
                        <p className={styles.username}>{name}</p>
                        {deletePost && 
                        <div>
                            <div className={styles.pauseContainer}>
                                <Pause active={active} postId={postId}/>
                            </div>
                            <div className={styles.deleteContainer}>
                                <DeletePost postId={postId}/>
                            </div>
                        </div> }
                    </div>
                    
                    <div className={styles.imagesResultsContainer}>
                        <div className={styles.imagesContainer}>
                            <img className={styles.image1} src={images.image1} alt={index}></img>
                            <img className={styles.image2} src={images.image2} alt={index}></img>
                        </div>

                        <p className={styles.title}>{title}</p>
                        <p className={styles.description}>{description}</p>
                        <p className={styles.time}>{time}</p>
                        {votes ? <VoteResult votes={votes} /> : votesUpdate && <VoteResult votes={votesUpdate} />}
                    </div>
                </Card>
                <hr className={styles.cardDivider}/>
            </div>
        </div>
    )
}

export default PostCard
