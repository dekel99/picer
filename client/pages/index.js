import { useEffect, useState } from 'react'
import Redirect from "../components/Redirect"
import styles from "../styles/index.module.css"
import { CheckAuth } from '../components/CheckAuth'

const img = "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzd8fHBob3RvZ3JhcGh5fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"
const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

export default function Main() {
  const [isAuth, setIsAuth] = useState()
  const [error, setError] = useState()

  useEffect(() => {
    CheckAuth().then(res => setIsAuth(res)).catch(err => setError(err.message))
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
    return null
  }
}