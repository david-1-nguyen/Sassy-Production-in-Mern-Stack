import React from 'react'
import {Card, Icon, Label, Container} from "semantic-ui-react";
import ServicesMenuBar from "./ ServicesMenuBar";

function ServiceCard(props) {
    const {title, price, description, category} = props.service

    return (
        <Container centered row>
            <ServicesMenuBar/>
        </Container>
)
}

export default ServiceCard
