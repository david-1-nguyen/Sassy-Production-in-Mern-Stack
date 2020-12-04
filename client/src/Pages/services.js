import React from 'react'
import {useQuery} from "@apollo/client";
import gql from 'graphql-tag'
import {Grid} from "semantic-ui-react";
import ServiceCard from "../Components/ServiceCard";
function Services() {
    const {loading, data: {
        getServices: services} = {} } = useQuery(FETCH_SERVICES_QUERY)

    return (
        <Grid columns={3} divided>
            <Grid.Row>
                <Grid.Column>
                    <h1>Services</h1>
                </Grid.Column>
                <Grid.Column>
                    <h1>Services2</h1>
                </Grid.Column>
                <Grid.Column>
                    <h1>Services3</h1>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column key={services.id}>
                    <ServiceCard service={services} />
                </Grid.Column>
            </Grid.Row>
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