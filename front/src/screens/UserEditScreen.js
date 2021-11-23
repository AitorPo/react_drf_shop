import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../components/Spinner'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { retrieveUserDetails, editUser } from '../actions/userActions'
import { USER_EDIT_RESET } from '../constants/userConstants'

function UserEditScreen({ match, history }) {
    const userId = match.params.id
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    const dispatch = useDispatch()
    const userDetails = useSelector(state => state.userDetails)
    const { e, loading, user } = userDetails
    const userEdit = useSelector(state => state.userEdit)
    const { error: errorEdit, loading: loadingEdit, success: successEdit } = userEdit

    useEffect(() => {
        if (successEdit) {
            dispatch({ type: USER_EDIT_RESET })
            history.push('/admin/list_users')
        } else {
            if (!user.name || user._id !== Number(userId)) {
                dispatch(retrieveUserDetails(userId))
            } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }
    }, [user, userId, successEdit, history])

    const submitHandler = (event) => {
        event.preventDefault()
        dispatch(editUser({_id:user._id, name, email, isAdmin}))
    }
    return (
        <div>
            <Link to='/admin/list_users'>Atrás</Link>
            <FormContainer>
                <h1>Editar cuenta</h1>
                {loadingEdit && <Spinner/>}
                {errorEdit && <Message variant='danger'>{errorEdit}</Message>}
                {loading ? <Spinner /> : e ? <Message variant='danger'>{e}</Message>
                    : (
                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId='name'>
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control
                                    type='name'
                                    placeholder='Nombre...'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId='email'>
                                <Form.Label>Correo electrónico</Form.Label>
                                <Form.Control
                                    type='email'
                                    placeholder='Correo electrónico...'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId='isadmin'>
                                <Form.Check
                                    type='checkbox'
                                    label='Admin'
                                    checked={isAdmin}
                                    onChange={(e) => setIsAdmin(e.target.checked)}
                                >
                                </Form.Check>
                            </Form.Group>

                            <Button className='mt-2' type='submit' variant='primary'>Actualizar</Button>
                        </Form>
                    )}

            </FormContainer>
        </div>
    )
}

export default UserEditScreen
