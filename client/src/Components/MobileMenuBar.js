import React, {useContext, useState} from 'react'
import {Dropdown, Menu} from 'semantic-ui-react'
import {Link} from "react-router-dom";
import {AuthContext} from "../context/auth";

function MobileMenuBar() {

    const {user, logout} = useContext(AuthContext)

    const pathname = window.location.pathname
    const path = pathname === '/' ? 'home' : pathname.substr(1)

    const [activeItem, setActiveItem] = useState(path)

    const handleItemClick = (e, {name}) => setActiveItem(name)

    return (user) ? (
        (
            <Menu size='massive' color='teal'>
                <Dropdown item text='Navigation'>
                    <Dropdown.Menu>
                        <Menu.Item
                            name={user.username}
                            active={activeItem === 'user.username'}
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
                        <Menu.Item
                            name='profile'
                            active={activeItem === 'profile'}
                            onClick={handleItemClick}
                            as={Link}
                            to='/profile'
                        />
                        <Menu.Item
                            name='logout'
                            active={activeItem === 'logout'}
                            onClick={logout}
                        />
                    </Dropdown.Menu>
                </Dropdown>
            </Menu>
        )
    ) : (
        <Menu size='massive' color='teal'>
            <Dropdown item text='Navigation'>
                <Dropdown.Menu>
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
                </Dropdown.Menu>
            </Dropdown>
        </Menu>
    )

}

export default MobileMenuBar
