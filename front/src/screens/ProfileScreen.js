import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../components/Spinner'
import Message from '../components/Message'
import { retrieveUserDetails, updateProfile } from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'

function ProfileScreen({ history }) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    const dispatch = useDispatch()
    // Información del usuario (Detalles)
    const userDetails = useSelector(state => state.userDetails)
    const { e, loading, user } = userDetails
    // Login de usuario 
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    // Actialización de usuario
    const userUpdateProfile = useSelector(state => state.userUpdate)
    const { success } = userUpdateProfile

    useEffect(() => {
        if (!userInfo) {
            // redirección forzosa si no existe el usuario (no hay login)
            history.push('/login')
        } else {
            if (!user || !user.name || success) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET })
                // pasamos el id como parámetro de nuestra action
                dispatch(retrieveUserDetails('profile'))
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, history, userInfo, user, success])

    const submitHandler = (event) => {
        event.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Las contraseñas no coinciden')
        } else {
            dispatch(updateProfile(
                {
                    'id': user._id,
                    'name': name,
                    'email': email,
                    'password': password
                }))
                setMessage('')
        }
    }
    return (
        <Row>
            <Col md={3}>
                <h2>Perfil</h2>
                {message && <Message variant='danger'>{message}</Message>}
                {/* Comprobamos si existe e (error) y loading. Si existen mostramos los componentes en cuestión */}
                {e && <Message variant='danger'>{e}</Message>}
                {loading && <Spinner />}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            required
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
                            required
                            type='email'
                            placeholder='Correo electrónico...'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='password'>
                        <Form.Label className='mt-3'>Contraseña</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Contraseña...'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='passwordConfirm'>
                        <Form.Label className='mt-3'>Confirmar contraseña</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Confirmar contraseña...'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                    <Button className='mt-2' type='submit' variant='primary'>Actualizar</Button>
                </Form>
            </Col>

            <Col md={3}>
                <h2>Mis pedidos</h2>
            </Col>
        </Row>
    )
}

export default ProfileScreen
