import React, {useContext} from 'react'
import gql from 'graphql-tag'
import { useQuery } from "@apollo/client";
import { AuthContext } from "../context/auth";
import {Grid, Item, Menu} from "semantic-ui-react";



function Appointment() {

    const {user} = useContext(AuthContext)
    const {loading, data: {getUserBookingsHistory: bookings} = {}} =
        useQuery(FETCH_USER_APP_BOOKINGS, {variables: {username: user.username}})

    return (
        <div>
            <h1>
                Appointment Page
            </h1>
            <ul>
                {
                    loading ? (<h1>Loading...</h1>) : (
                        bookings &&
                        bookings.map(booking => (
                            <Item>
                                <Item.Content>
                                    <Item.Header as='h3'>{ booking.createdAt }</Item.Header>

                                </Item.Content>
                            </Item>
                        ))
                    )
                }
            </ul>
        </div>
    )
}


const FETCH_USER_APP_BOOKINGS =
    gql`
        query getUserBookingsHistory($username: String!)
        {
            getUserBookingsHistory(username: $username)
            {
                id
                createdAt
                serviceType {
                    title
                    price
                    category
                }
            }
        }
    `

export default Appointment