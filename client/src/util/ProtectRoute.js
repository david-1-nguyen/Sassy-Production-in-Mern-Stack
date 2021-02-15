import React, {useContext} from 'react'

import {AuthContext} from "../context/auth";
import {Redirect, Route} from "react-router-dom";

function ProtectRoute({component: Component, ...rest}) {
    const {user} = useContext(AuthContext)

    return (
        <Route
            {...rest}
            render={props =>
                user ? <Component {...props} /> : <Redirect to='/'/>}
        />
    )
}

export default ProtectRoute