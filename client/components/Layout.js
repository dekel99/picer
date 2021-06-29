import React, { useEffect, useState } from 'react'
import Header from './Header'
import MobileFooter from './MobileFooter'
import {CheckAuth} from './CheckAuth'

function Layout({ children }) {
    const [isAuth, setIsAuth] = useState(false)

    useEffect(() => {
        CheckAuth().then(res => setIsAuth(res)).catch(err => console.log(err))
    }, [])
    

    if (isAuth){
        return (
            <div>
                <Header isAuth={isAuth}/>
                <main>{children}</main>         
                <MobileFooter />
            </div>
        )
    }
    return(
        <div>
            <Header isAuth={isAuth}/>
            <main>{children}</main>         
        </div>
    )
}

export default Layout
