import { useEffect, useState } from 'react'
import Redirect from "../components/Redirect"
import styles from "../styles/index.module.css"
import { CheckAuth } from '../components/CheckAuth'
import LoadingSmall from '../components/LoadingSmall'

const img = "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzd8fHBob3RvZ3JhcGh5fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"
const text = "With picer you can easily find which one from two pictures is the best for your specific need! just upload two images and decide on which criterion the community should base their votes."
let firstLoad = true

export default function Main() {
  const [isAuth, setIsAuth] = useState()
  const [error, setError] = useState()

  setTimeout(() => {
    firstLoad = false
  }, 2000);
  
  useEffect(() => {
    CheckAuth().then(res => { 
      setIsAuth(res)
    }).catch(err => setError(err.message))
  }, [])

  if (isAuth===true){
    return <Redirect to="/vote" /> 
  } else if (isAuth===false) {
    return(
      <div>
        <h1 className={styles.appMainHeader}>Welcome to picer</h1>
        <h3 className={styles.appSecondHeader}>The best app to choose your best picture</h3>
        <img className={styles.mainImg} src={img} alt="test pic"></img>
        <p className={styles.appMainText}>{text}</p>
      </div>
    )
  } else if (error){
    return <p>{error}</p>
  } else { 
    return firstLoad ? <div style={{marginTop: "50px"}}>Waiting for server, please refresh in few seconds <LoadingSmall loading={true}/></div> : null
  }
}