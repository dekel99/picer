import React, { useState } from 'react'
import Header from './Header'
import MobileFooter from './MobileFooter'
import Navbar from './navbar'
import Main from "../pages/index"

function Layout({ children }) {
    const [isAuth, setIsAuth] = useState(true)

    if (isAuth){
        return (
            <div>
                <Navbar/>
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
