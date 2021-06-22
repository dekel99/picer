import React, { useEffect, useState } from 'react'
import Header from './Header'
import MobileFooter from './MobileFooter'

function Layout({ children }) {
    const [isAuth, setIsAuth] = useState(false)

    useEffect(() => {
        if(localStorage.getItem("auth")==="true"){
          setIsAuth(true)
        } else {
          setIsAuth(false)
        }
    }, [])

    if (isAuth){
        return (
            <div>
                <Header />
                <main>{children}</main>         
                <MobileFooter />
            </div>
        )
    }
    return(
        <div>
            <Header />
            <main>{children}</main>         
        </div>
    )
}

export default Layout
