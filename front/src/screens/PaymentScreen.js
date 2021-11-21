import React, { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'

function PaymentScreen({ history }) {
    const cart = useSelector(state => state.cart)
    const { shippingInfo } = cart
    const dispatch = useDispatch()
    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    if(!shippingInfo.address){
        // Redirigimos a "shipping" si no existe dirección de envío
        history.push('/shipping')
    }

    const submitHandler = (event) => {
        event.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/place-order')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3/>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>
                        Seleccionar método de pago
                    </Form.Label>
                    <Col>
                        <Form.Check 
                            type='radio' 
                            label='PayPal o Tarjeta de crédito'
                            id='paypal'
                            name='paymentMethod'
                            checked
                            onChange={(event) => setPaymentMethod(event.target.value)}    
                        >

                        </Form.Check>
                    </Col> 
                </Form.Group>
                <Button type='submit' variant='primary'>
                    Continuar
                </Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen
