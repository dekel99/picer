import React from 'react'
import styles from "../styles/loadingSmall.module.css"

function LoadingSmall(props) {
    return (
        <div>
            {props.loading && 
                <div className={styles.smallLoadingContainer} style={props.style}>
                    <div className={styles.smallLoading}>
                        {props.regular ? 
                            <lottie-player src="https://assets4.lottiefiles.com/packages/lf20_knpXLX.json"  background="transparent"  speed="1"  style={{width: "50px", height: "50px"}}  loop  autoplay></lottie-player>      
                        :
                            <lottie-player src="https://assets2.lottiefiles.com/packages/lf20_x62chJ.json"  background="transparent"  speed="1"  style={{width: "200px", height: "200px"}}  loop  autoplay></lottie-player>}
                    </div>
                </div>}
        </div>
    )
}

export default LoadingSmall
