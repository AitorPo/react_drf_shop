import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../components/Spinner'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions'

function LoginScreen({location, history}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const redirect = location.search ? location.search.split('=')[1] : '/';
    const userLogin = useSelector(state => state.userLogin)
    const {e, loading, userInfo} = userLogin
    
    useEffect(() => {
        if(userInfo){
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (event) => {
        event.preventDefault()
        dispatch(login(email, password))
    }
    
    return (
        <FormContainer>
            <h1>Sign In</h1>
            {/* Comprobamos si existe e (error) y loading. Si existen mostramos los componentes en cuestión */}
            {e && <Message variant='danger'>{e}</Message>}
            {loading && <Spinner />}
            <Form onSubmit={submitHandler}>
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
                <Button className='mt-2' type='submit' variant='primary'>Entrar</Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    ¿Es la primera vez que nos visitas? 
                    <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                        Regístrate
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen
