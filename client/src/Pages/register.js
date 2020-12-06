import React, {useState} from 'react'
import {Form, Button} from 'semantic-ui-react'
import gql from 'graphql-tag'
import {useMutation} from "@apollo/client";

function Register() {
    const [values, setValues] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
    })

    const onChange = (event) => {
        setValues({...values, [event.target.name]: event.target.value})
    }


    const [addUser, {loading}] = useMutation(REGISTER_USER, {
        update(proxy, result) {
            console.log(result)
        },
        variables: values
    })

    const onSubmit = (event) => {
        event.preventDefault()
        addUser().then(r => console.log(r))
    }

    return (
        <div className='form-container'>
            <Form onSubmit={onSubmit} noValidate>
                <h1> Register </h1>
                <Form.Input
                    label='Username'
                    placeholder='Username...'
                    name='username'
                    value={values.username}
                    onChange={onChange}
                />
                <Form.Input
                    label='Password'
                    placeholder='Password...'
                    name='password'
                    type='password'
                    value={values.password}
                    onChange={onChange}
                />
                <Form.Input
                    label='Confirm Password'
                    placeholder='Confirm Password...'
                    name='confirmPassword'
                    type='password'
                    value={values.confirmPassword}
                    onChange={onChange}
                />
                <Form.Input
                    label='Email'
                    placeholder='Email...'
                    name='email'
                    value={values.email}
                    onChange={onChange}
                />
                <Button type='submit' primary>
                    Register!
                </Button>
            </Form>
        </div>
    )
}

const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $password: String!
        $confirmPassword: String!
        $email: String!
    ) {
        register(
            registerInput: {
                username: $username
                password: $password
                confirmPassword: $confirmPassword
                email: $email
            }
        ) {
            id email token username createdAt admin
        }
    }
`

export default Register