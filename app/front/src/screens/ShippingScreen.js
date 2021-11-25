import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingInfo } from '../actions/cartActions'

function ShippingScreen({ history }) {
    const cart = useSelector(state => state.cart)
    const { shippingInfo } = cart
    const dispatch = useDispatch()
    const [address, setAddress] = useState(shippingInfo.address)
    const [city, setCity] = useState(shippingInfo.city)
    const [postalCode, setpostalCode] = useState(shippingInfo.postalCode)
    const [country, setCountry] = useState(shippingInfo.country)

    const submitHandler = (event) => {
        event.preventDefault()
        dispatch(saveShippingInfo({address, city, postalCode, country}))
        history.push('/payment')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2/>
            <h1>Envío</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className='mt-2' controlId='address'>
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Dirección...'
                        value={address ? address : ''}
                        onChange={(e) => setAddress(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group className='mt-2' controlId='city'>
                    <Form.Label>Ciudad</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Ciudad...'
                        value={city ? city : ''}
                        onChange={(e) => setCity(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group className='mt-2' controlId='postalCode'>
                    <Form.Label>Código postal</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Código postal...'
                        value={postalCode ? postalCode : ''}
                        onChange={(e) => setpostalCode(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group className='mt-2' controlId='country'>
                    <Form.Label>País</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='País...'
                        value={country ? country : ''}
                        onChange={(e) => setCountry(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Button className='mt-2' type='submit' variant='primary'>
                    Continuar
                </Button>
            </Form>
        </FormContainer>
    )
}

export default ShippingScreen
