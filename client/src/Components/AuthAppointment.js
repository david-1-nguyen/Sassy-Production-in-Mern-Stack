import React, {useContext} from 'react'
import gql from 'graphql-tag'
import {useQuery, useMutation} from "@apollo/client";
import {AuthContext} from "../context/auth";
import {Button, Form, Item} from "semantic-ui-react";
import {useForm} from "../util/hooks";


function AuthAppointment(props) {

    const {user} = useContext(AuthContext)

    const initialState = {
        description: ''
    }

    const {onChange, onSubmit, values} = useForm(createAppointmentCallback, initialState)

    const {loading_bookings, data: {getUserBookingsHistory: bookings} = {}} =
        useQuery(FETCH_USER_APP_BOOKINGS, {variables: {username: user ? user.username : null}})

    const [sendAppointMutation, {loading_create}] = useMutation(MAKE_APP_BOOKING, {
        update(_) {
            props.history.push('/success')
        },
        variables: values
    })


    function createAppointmentCallback() {
        sendAppointMutation()
    }

    return (
        <div>
            <div className='form-container'>
                <Form onSubmit={onSubmit} noValidate className={loading_create ? 'loading' : ''}>
                    <h1> Make a new booking! </h1>
                    <Form.Input
                        label='description'
                        placeholder='description...'
                        name='description'
                        value={values.description}
                        onChange={onChange}
                    />
                    <Button type='submit' primary>
                        Create Appointment Booking!
                    </Button>
                </Form>
                <h1> Your past bookings listed here </h1>
                <ul>
                    {
                        loading_bookings ? (<h1>Loading...</h1>) : (
                            bookings &&
                            bookings.map(booking => (
                                <li>
                                    <Item>
                                        <Item.Content key={user}>
                                            <Item.Header as='h3'>{booking.createdAt}</Item.Header>
                                            <Item.Header as='h3'>{booking.serviceType}</Item.Header>
                                            <Item.Header as='h3'>{booking.confirmed}</Item.Header>
                                        </Item.Content>
                                    </Item>
                                </li>
                            ))
                        )
                    }
                </ul>
            </div>
        </div>
    )
}


const FETCH_USER_APP_BOOKINGS =
gql`
    query getUserBookingsHistory($username: String!)
    {
        getUserBookingsHistory(username: $username)
        {
            createdAt
            confirmed
            serviceType
        }
    }
`

const MAKE_APP_BOOKING =
gql`
    mutation createAppointmentBooking($description : String!)
    {
        createAppointmentBooking(description: $description)
        {
            id
            createdAt
            confirmed
            serviceType
        }
    }
`
export default AuthAppointment