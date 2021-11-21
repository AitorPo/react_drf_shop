import React, { useState, useEffect } from 'react'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import { CURRENCY, IVA } from '../constants/productConstants'
import { createOrder } from '../actions/orderActions'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'

function PlaceOrderScreen({ history }) {
    const orderCreate = useSelector(state => state.orderCreate)
    const { order, e, success } = orderCreate
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    cart.itemsPrice = cart.cartItems.reduce((accum, item) => accum + item.price * item.units, 0).toFixed(2)
    cart.shippingPrice = (cart.itemsPrice > 50 ? 0 : 3.99).toFixed(2)
    cart.taxPrice = Number((IVA) * cart.itemsPrice).toFixed(2)
    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)

    if (!cart.paymentMethod) {
        history.push('/payment')
    }

    useEffect(() => {
        if (success) {
            history.push(`/order/${order._id}`)
            dispatch({ type: ORDER_CREATE_RESET })
        }
    }, [success, history])

    const placeOrder = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingInfo: cart.shippingInfo,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.ItemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice
        }))
    }
    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Envío</h2>
                            <p>
                                <strong>Envío: </strong>
                                {cart.shippingInfo.addres}, {cart.shippingInfo.city}
                                {'  '}
                                {cart.shippingInfo.postalCode},
                                {'  '}
                                {cart.shippingInfo.country}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Método de pago</h2>
                            <p>
                                <strong>Método: </strong>
                                {cart.paymentMethod}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Productos</h2>
                            {cart.cartItems.length === 0 ? <Message variant='flush'>
                                Tu carrito está vacío
                            </Message> : (
                                <ListGroup variant='flush'>
                                    {cart.cartItems.map((item, index) => (
                                        <ListGroup.Item>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.units} x {item.price}{CURRENCY} = {(item.units * item.price).toFixed(2)}{CURRENCY}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Resumen del pedido</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Productos:
                                    </Col>
                                    <Col>
                                        {cart.itemsPrice}{CURRENCY}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Envío:
                                    </Col>
                                    <Col>
                                        {cart.shippingPrice}{CURRENCY}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        IVA:
                                    </Col>
                                    <Col>
                                        {cart.taxPrice}{CURRENCY}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Total:
                                    </Col>
                                    <Col>
                                        {cart.totalPrice}{CURRENCY}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {e && <Message variant='danger'>{e}</Message>}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button
                                    type='submit'
                                    className='btn-block w-100'
                                    disabled={cart.cartItems === 0}
                                    onClick={placeOrder}
                                >
                                    Realizar pedido
                                </Button>
                            </ListGroup.Item>

                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default PlaceOrderScreen
