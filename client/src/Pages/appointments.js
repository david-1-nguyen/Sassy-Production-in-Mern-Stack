import React, {useContext} from 'react'
import {AuthContext} from "../context/auth";
import Banner from "../Components/Banner";
import AuthAppointment from "../Components/AuthAppointment";


function Appointment(props) {

    const {user} = useContext(AuthContext)
    return user ? (
        <div>
            <Banner bigheader='View or Make Appointments!' subtext='Appointments need to be confirmed'/>
            <AuthAppointment props={props}/>
        </div>
    ) : (
        <div>
            <Banner bigheader='View or Make Appointments!' subtext='Appointments need to be confirmed'/>
        </div>
    )
}

export default Appointment