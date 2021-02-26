import React from 'react'
import {useViewport} from "../context/mobile";
import MobileMenuBar from "./MobileMenuBar";
import DesktopMenuBar from "./DesktopMenuBar";

function MenuBar() {
    const size = useViewport()

    if (size.width < 500)
        return <MobileMenuBar/>
    else
        return <DesktopMenuBar/>

}

export default MenuBar
