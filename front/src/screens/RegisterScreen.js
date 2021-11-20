import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../components/Spinner'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'

function RegisterScreen({location, history}) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    const dispatch = useDispatch()
    const redirect = location.search ? location.search.split('=')[1] : '/';
    const userRegister = useSelector(state => state.userRegister)
    const {e, loading, userInfo} = userRegister
    
    useEffect(() => {
        if(userInfo){
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (event) => {
        event.preventDefault()
        if(password !== confirmPassword){
            setMessage('Las contraseñas no coinciden')
        }else{
            dispatch(register(name, email, password))
        }
    }
    return (
        <FormContainer>
            <h1>Sign In</h1>
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
                        required
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
                        required
                        type='password'
                        placeholder='Confirmar contraseña...'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Button className='mt-2' type='submit' variant='primary'>Registrarse</Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    ¿Ya tienes una cuenta? 
                    <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                        Identifícate
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen
