import React, {useState} from 'react'
import {Menu} from 'semantic-ui-react'
import {Link} from "react-router-dom";

function ServicesMenuBar() {
    const [activeItem, setActiveItem] = useState()

    const handleItemClick = (e, {name}) => setActiveItem(name)

    return (
        <Menu secondary>
            <Menu.Item
                name='manicures'
                active={activeItem === 'manicures'}
                onClick={handleItemClick}
            />
            <Menu.Item
                name='pedicures'
                active={activeItem === 'pedicures'}
                onClick={handleItemClick}

            />
            <Menu.Item
                name='waxings'
                active={activeItem === 'waxings'}
                onClick={handleItemClick}
            />
        </Menu>
    )
}

export default ServicesMenuBar
