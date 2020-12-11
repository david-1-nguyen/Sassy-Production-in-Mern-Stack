import React from 'react'
import {Item} from "semantic-ui-react";

function ServiceItem(props) {
    const {title, price, description} = props.service
    return (
        <Item>
            <Item.Image size='small' src='https://react.semantic-ui.com/images/wireframe/image.png' />
            <Item.Content>
                <Item.Header as='a'>{ title }</Item.Header>
                <Item.Meta> Description </Item.Meta>
                <Item.Description> { description } </Item.Description>
                <Item.Meta> Price </Item.Meta>
                <Item.Description> Starting ${ price } </Item.Description>
            </Item.Content>
        </Item>
    )
}

export default ServiceItem
