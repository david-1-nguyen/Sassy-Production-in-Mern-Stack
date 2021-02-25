import React, {useState} from 'react'
import {useQuery} from "@apollo/client";
import gql from 'graphql-tag'
import {Item, Menu} from "semantic-ui-react";

import ServiceItem from "../Components/ServiceItem";
import Banner from "../Components/Banner";

/*
* Since we have relatively small amount of services, fetch all services and
* dynamically render service items based on changes on the selections we made
* in small service menu
* */
function Services() {

    const {loading, data: {getServices: services} = {}} =
        useQuery(FETCH_SERVICES_QUERY)

    const [activeItem, setActiveItem] = useState('manicures')

    const handleItemClick = (e, {name}) => {
        setActiveItem(name)
    }

    return (
        <div>
            <Banner/>
            <div className="form-container ">
                <div className='menu-center'>
                    <Menu secondary pointing compact>
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
                </div>
                {
                    loading ? (<h1>Loading...</h1>) : (
                        services &&
                        services.filter(service => (
                            service.category === activeItem
                        )).map(service => (
                            <Item.Group key={service.id}>
                                <ServiceItem className='item-center' service={service} activeItem={activeItem}/>
                            </Item.Group>
                        ))
                    )
                }
            </div>

        </div>

    )
}

const FETCH_SERVICES_QUERY =
gql`{
    getServices {
        id
        title
        price
        description
        category
    }
}`


export default Services