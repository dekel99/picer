import { useEffect, useState } from 'react'
import Redirect from "../components/Redirect"

const img="https://images.unsplash.com/photo-1452587925148-ce544e77e70d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzd8fHBob3RvZ3JhcGh5fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"
const text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

export default function Main() {

  const [isAuth, setIsAuth] = useState(false)

  useEffect(() => {
    if(localStorage.getItem("auth")==="true"){
      setIsAuth(true)
    } else {
      setIsAuth(false)
    }
  }, [])
  
  if (isAuth){
    return <Redirect to="/vote" />
  }
  return(
    <div>
      <h1>Welcome to picer</h1>
      <h3>The best app to choose your best picture</h3>
      <img style={{width: "100%"}} src={img} alt="test pic"></img>
      <p style={{margin: "20px"}}>{text}</p>
    </div>
  )
}