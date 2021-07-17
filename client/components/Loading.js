import React from 'react'
import Portal from './Portal'
import styles from "../styles/loading.module.css"

function Loading(props) {
    return (
        <div>
            {props.loading && 
            <Portal portalId="loading">
                <div className={styles.pageContainerLoading}>
                    <div className={styles.loading}>
                        <lottie-player src="https://assets1.lottiefiles.com/packages/lf20_Stt1R6.json"  background="transparent"  speed="1"  style={{width: "50px", height: "50px"}}  loop  autoplay></lottie-player>
                    </div>
                </div>
            </Portal>} 
        </div>
    )
}

export default Loading
