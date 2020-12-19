import React, {useContext, useState} from 'react'
import {Menu} from 'semantic-ui-react'
import {Link} from "react-router-dom";
import {AuthContext} from "../context/auth";

function MenuBar() {


    const { user, logout } = useContext(AuthContext)

    const pathname = window.location.pathname
    const path = pathname === '/' ? 'home' : pathname.substr(1)

    const [activeItem, setActiveItem] = useState(path)

    const handleItemClick = (e, {name}) => setActiveItem(name)

    return (user)  ? (

        (
            <Menu size='massive' color='teal'>
                <Menu.Item
                    name={user.username}
                    active={activeItem === 'home'}
                    onClick={handleItemClick}
                    as={Link}
                    to='/'
                />
                <Menu.Item
                    name='services'
                    active={activeItem === 'services'}
                    onClick={handleItemClick}
                    as={Link}
                    to='/services'
                />
                <Menu.Item
                    name='bookings'
                    active={activeItem === 'bookings'}
                    onClick={handleItemClick}
                    as={Link}
                    to='/bookings'
                />
                <Menu.Menu position='right'>
                    <Menu.Item
                        name='logout'
                        active={activeItem === 'logout'}
                        onClick={logout
                        }
                    />
                </Menu.Menu>
            </Menu>
        )
    ) : (
        <Menu size='massive' color='teal'>
            <Menu.Item
                name='home'
                active={activeItem === 'home'}
                onClick={handleItemClick}
                as={Link}
                to='/'
            />
            <Menu.Item
                name='services'
                active={activeItem === 'services'}
                onClick={handleItemClick}
                as={Link}
                to='/services'
            />
            <Menu.Item
                name='bookings'
                active={activeItem === 'bookings'}
                onClick={handleItemClick}
                as={Link}
                to='/bookings'
            />
            <Menu.Menu position='right'>
                <Menu.Item
                    name='login'
                    active={activeItem === 'login'}
                    onClick={handleItemClick}
                    as={Link}
                    to='/login'
                />
                <Menu.Item
                    name='register'
                    active={activeItem === 'register'}
                    onClick={handleItemClick}
                    as={Link}
                    to='/register'
                />
            </Menu.Menu>
        </Menu>
    )
}

export default MenuBar
