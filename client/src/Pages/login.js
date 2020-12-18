import React, {useState, useContext} from 'react'
import {Form, Button} from 'semantic-ui-react'
import gql from 'graphql-tag'
import {useMutation} from "@apollo/client";
import {useForm} from "../util/hooks";
import {AuthContext} from "../context/auth";

function Login(props) {
    const context = useContext(AuthContext)
    const [errors, setErrors] = useState({})

    const initialState = {
        username: '',
        password: '',
    }

    const {onChange, onSubmit, values} = useForm(loginUserCallback, initialState)

    const [loginUser, {loading}] = useMutation(LOGIN_USER, {
        update(_, {data: {login: userData }}) {
            context.login(userData)
            props.history.push('/')
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exceptions.errors)
        },
        variables: values
    })

    function loginUserCallback() {
        loginUser()
    }

    return (
        <div className='form-container'>
            <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
                <h1> Login </h1>
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
                <Button type='submit' primary>
                    Login!
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

const LOGIN_USER = gql`
    mutation login(
        $username: String!
        $password: String!
    ) {
        login(
            username: $username
            password: $password
        ) {
            id email token username createdAt admin
        }
    }
`

export default Login