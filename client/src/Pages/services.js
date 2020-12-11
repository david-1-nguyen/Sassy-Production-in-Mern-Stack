import React, {useState} from 'react'
import {useQuery} from "@apollo/client";
import gql from 'graphql-tag'
import {Grid, Item, Menu} from "semantic-ui-react";

import ServiceItem from "../Components/ServiceItem";

function Services() {

    const {loading, data: {getServices: services} = {}} =
        useQuery(FETCH_SERVICES_QUERY)

    const [activeItem, setActiveItem] = useState('manicures')

    const handleItemClick = (e, {name}) => {
        setActiveItem(name)
    }

    return (
        <Grid>
            <Grid.Column width={4}>
                <Menu secondary vertical>
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
            </Grid.Column>
            <Grid.Column width={12}>
                {
                    loading ? (<h1>Loading...</h1>) : (
                        services &&
                        services.filter(service => (
                            service.category === activeItem
                        )).map(service => (
                            <Item.Group key={service.id}>
                                <ServiceItem service={service} activeItem={activeItem}/>
                            </Item.Group>
                        ))
                    )
                }
            </Grid.Column>
        </Grid>
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