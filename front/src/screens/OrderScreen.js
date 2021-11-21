import React, { useState, useEffect } from 'react'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Spinner from '../components/Spinner'
import { CURRENCY, IVA } from '../constants/productConstants'
import { getOrderDetails } from '../actions/orderActions'
import moment from 'moment'

function OrderScreen({ match }) {
    const orderId = match.params.id
    const dispatch = useDispatch()
    const orderDetails = useSelector(state => state.orderDetails)
    const { order, e, loading } = orderDetails
    if (!loading && !e)
        order.itemsPrice = order.orderItems.reduce((accum, item) => accum + item.price * item.units, 0).toFixed(2)

    useEffect(() => {
        if (!order || order._id !== Number(orderId)) {
            dispatch(getOrderDetails(orderId))
        }
    }, [dispatch, order, orderId])

    return loading ? (
        <Spinner />
    ) : e ? (
        <Message variant='danger'>{e}</Message>
    ) : (
        <div>
            <h1>Pedido: {order._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Envío</h2>
                            <p><strong>Nombre: </strong> {order.user.name}</p>
                            <p><strong>Email: </strong> <a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                            <p>
                                <strong>Envío: </strong>
                                {order.shippingAddress.address}, {order.shippingAddress.city}
                                {'  '}
                                {order.shippingAddress.postalCode},
                                {'  '}
                                {order.shippingAddress.country}
                            </p>
                            {order.isDelivered ? (
                                <Message variant='success'>
                                    Enviado el {' '}
                                    {moment(order.deliveredAt).format('DD MMM YYYY')}
                                </Message>
                            ) : (
                                <Message variant='warning'>Pendiente de envío</Message>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Método de pago</h2>
                            <p>
                                <strong>Método: </strong>
                                {order.paymentMethod}
                            </p>
                            {order.isPaid ? (
                                <Message variant='success'>
                                    Pagado el {' '}
                                    {moment(order.paidAt).format('DD MMM YYYY')}
                                </Message>
                            ) : (
                                <Message variant='warning'>Pendiente de pago</Message>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Productos</h2>
                            {order.orderItems.length === 0 ? <Message variant='flush'>
                                Tu pedido está vacío
                            </Message> : (
                                <ListGroup variant='flush'>
                                    {order.orderItems.map((item, index) => (
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
                                    <Col></Col>
                                    <Col>
                                        {order.itemsPrice}{CURRENCY}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Envío:
                                    </Col>
                                    <Col></Col>
                                    <Col>
                                        {order.shippingPrice}{CURRENCY}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        IVA:
                                    </Col>
                                    <Col></Col>
                                    <Col>
                                        {order.taxPrice}{CURRENCY}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Total:
                                    </Col>
                                    <Col></Col>
                                    <Col>
                                        {order.totalPrice}{CURRENCY}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default OrderScreen

