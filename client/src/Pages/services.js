import React from 'react'
import {useQuery} from "@apollo/client";
import gql from 'graphql-tag'


function Services() {
    const { loading, data } = useQuery(FETCH_SERVICES_QUERY)
    if(data)
        console.log(data)
    return (
        <div>
            <h1>
                Services
            </h1>
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
        }
    }`


export default Services