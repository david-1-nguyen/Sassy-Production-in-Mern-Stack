import React, {useContext} from 'react'
import gql from 'graphql-tag'
import { useQuery } from "@apollo/client";
import { AuthContext } from "../context/auth";
import { Item } from "semantic-ui-react";



function Appointment() {

    const {user} = useContext(AuthContext)
    const {loading, data: {getUserBookingsHistory: bookings} = {}} =
        useQuery(FETCH_USER_APP_BOOKINGS, {variables: {username: user ? user.username : null}})

    return user ? (
        <div>
            <h1>
                Appointment Page
            </h1>
            <h1> Your past bookings listed here </h1>
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
            <h1> Make a new booking! </h1>
        </div>
    ) : (
        <div>
            <h1>
                Appointment Page
            </h1>
            <h1>
                Login to see your bookings and make a booking!
            </h1>
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
                confirmed
                serviceType
            }
        }
    `

export default Appointment