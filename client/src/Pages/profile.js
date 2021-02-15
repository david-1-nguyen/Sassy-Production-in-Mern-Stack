import React, { useContext} from 'react'
import gql from 'graphql-tag'
import { useQuery} from "@apollo/client";
import {AuthContext} from "../context/auth";

function Profile() {
    const context = useContext(AuthContext)
    console.log(context.user ? {username: context.user.username} : {})
    const {loading, error, data } =
        useQuery(FIND_USER_INFO, {
            variables : (context.user ? {username: context.user.username} : {})
        })

    // if(data)
    //     console.log(data.getAUser.username)

    return (
        <div className='form-container'>
            <h1>
                Profile Page
            </h1>
            <h2>
                { data ? data.getAUser.username : "Can't get username!"}
            </h2>
        </div>
    )
}

const FIND_USER_INFO = gql`
    query getAUser(
        $username: String!
    ) {
        getAUser(username: $username)
        {
            id
            username
            email
            phonenumber
            bookingsHistory {
                confirmed
                createdAt
                serviceType
            }
            createdAt
        }
    }
`

export default Profile