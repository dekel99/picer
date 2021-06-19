import { useState } from 'react'
import Redirect from "../components/Redirect"


export default function Main() {

  const [isAuth, setIsAuth] = useState(true)
  
  if (isAuth){
    return <Redirect to="/home" />
  }
  return <Redirect to="/login" />
}