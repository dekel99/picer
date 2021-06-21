import React from 'react'
import Card from '@material-ui/core/Card';
import styles from "../styles/postCard.module.css"



function PostCard(props) {

    const {username, images, title, description, time} = props
    
    return (
        <div>
            <div className={styles.cardContainer}>
                <Card>
                    <p className={styles.username}>{username}</p>

                    <div className={styles.imagesContainer}>
                        <img className={styles.image1} src={images.image1}></img>
                        <img className={styles.image2} src={images.image2}></img>
                    </div>

                    <p className={styles.title}>{title}</p>
                    <p className={styles.description}>{description}</p>
                    <p className={styles.time}>{time}</p>        
                </Card>
            </div>
        </div>
    )
}

export default PostCard
