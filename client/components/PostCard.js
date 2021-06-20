import React from 'react'
import Card from '@material-ui/core/Card';
import styles from "../styles/postCard.module.css"

const userPost = {
    username: "dekel", 
    title: "this is title", 
    description: "this is very long description .................", 
    time: "12:00", 
    images: {
        image1: "https://images.pexels.com/photos/1987301/pexels-photo-1987301.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        image2: "https://vinusimages.co/wp-content/uploads/2018/10/EG7A2390.jpgA_.jpg"
    }    
}

function PostCard() {
    return (
        <div>
            <div className={styles.cardContainer}>
                <Card>
                    <p className={styles.username}>{userPost.username}</p>

                    <div className={styles.imagesContainer}>
                        <img className={styles.image1} src={userPost.images.image1}></img>
                        <img className={styles.image2} src={userPost.images.image2}></img>
                    </div>

                    <p className={styles.title}>{userPost.title}</p>
                    <p className={styles.description}>{userPost.description}</p>
                    <p className={styles.time}>{userPost.time}</p>        
                </Card>
            </div>
        </div>
    )
}

export default PostCard
