import { useState } from 'react'
import Redirect from "../components/Redirect"


export default function Main() {

  const [isAuth, setIsAuth] = useState(false)
  
  if (isAuth){
    return <Redirect to="/vote" />
  }
  return(
    <h1>this is the web page of the app</h1>
  )
}