import React, {createContext, useEffect, useState} from "react";

const mobileContext = createContext({})


const MobileViewProvider = ({children}) => {
    const INITIAL_STATE = {
        width: window.innerWidth,
        height: window.innerHeight
    }

    const [windowSizing, setWindowSizing] = useState(INITIAL_STATE)

    const handleWindowChange = () => {
        setWindowSizing({
            width: window.innerWidth,
            height: window.innerHeight
        })
    }

    useEffect(() => {
        window.addEventListener("resize", handleWindowChange)
        return () => window.removeEventListener("resize", handleWindowChange)
    }, [])

    return (
        <mobileContext.Provider value={windowSizing}>
            {children}
        </mobileContext.Provider>
    )
}

const useViewport = () => {
    const {width, height} = React.useContext(mobileContext)
    return {width, height}
}

export {MobileViewProvider, useViewport}