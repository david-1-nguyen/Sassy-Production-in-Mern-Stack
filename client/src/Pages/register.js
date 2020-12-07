import React, {useState} from 'react'
import {Form, Button} from 'semantic-ui-react'
import gql from 'graphql-tag'
import {useMutation} from "@apollo/client";
import { useForm } from "../util/hooks";

function Register(props) {
    const [errors, setErrors] = useState({})

    const initialState = {
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
    }

    const {onChange, onSubmit, values} = useForm(registerUser, initialState)

    const [addUser, {loading}] = useMutation(REGISTER_USER, {
        update(_, result) {
            props.history.push('/')
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors )
        },
        variables: values
    })

    function registerUser() {
        addUser()
    }

    return (
        <div className='form-container'>
            <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : '-'}>
                <h1> Register </h1>
                <Form.Input
                    label='Username'
                    placeholder='Username...'
                    name='username'
                    value={values.username}
                    error={!!errors.username}
                    onChange={onChange}
                />
                <Form.Input
                    label='Password'
                    placeholder='Password...'
                    name='password'
                    type='password'
                    value={values.password}
                    error={!!errors.password}
                    onChange={onChange}
                />
                <Form.Input
                    label='Confirm Password'
                    placeholder='Confirm Password...'
                    name='confirmPassword'
                    type='password'
                    value={values.confirmPassword}
                    error={!!errors.confirmPassword}
                    onChange={onChange}
                />
                <Form.Input
                    label='Email'
                    placeholder='Email...'
                    name='email'
                    value={values.email}
                    error={!!errors.email}
                    onChange={onChange}
                />
                <Button type='submit' primary>
                    Register!
                </Button>
            </Form>
            {Object.keys(errors).length > 0 && (
                <div className='ui error message'>
                    <ul className='list'>
                        {Object.values(errors).map((value => (
                            <li key={value}>{value}</li>
                        )))}
                    </ul>
                </div>
            )}
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