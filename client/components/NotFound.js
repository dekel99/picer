import React from 'react'
import styles from "../styles/notFound.module.css"

function NotFound(props) {
    return (
        <div>
            {props.notFound && 
                <div>
                    <p className={styles.text}>There is no posts to show right now please try again later...</p>
                    <img style={{width: "100vw", maxWidth: "400px"}} src="https://cdn.dribbble.com/users/1121009/screenshots/11030107/media/25be2b86a12dbfd8da02db4cfcbfe50a.jpg?compress=1&resize=400x300"/>
                </div>}        
        </div>
    )
}

export default NotFound
