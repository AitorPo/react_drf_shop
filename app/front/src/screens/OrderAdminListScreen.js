import React, { useState, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../components/Spinner'
import Message from '../components/Message'
import moment from 'moment'
import { getOrderAdminList } from '../actions/orderActions'
import { CURRENCY } from '../constants/productConstants'

function OrderAdminListScreen({ history }) {
    const dispatch = useDispatch()
    const orderAdminList = useSelector(state => state.orderAdminList)
    const { loading, error, orders } = orderAdminList
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin


    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(getOrderAdminList())
        } else {
            history.push('/login')
        }
    }, [dispatch, history, userInfo])

    return (
        <div>
            <h1>Pedidos</h1>
            {loading
                ? (<Spinner />)
                : error
                    ? (<Message variant='danger'>{error}</Message>)
                    : (
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>USUARIO/A</th>
                                    <th>FECHA</th>
                                    <th>TOTAL</th>
                                    <th>PAGADO</th>
                                    <th>ENVIADO</th>
                                    <th>INFO</th>
                                </tr>
                            </thead>

                            <tbody>
                                {orders.map(order => (
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>{order.user && order.user.name}</td>
                                        <td>{moment(order.createdAt).format('DD MMM YYYY')}</td>
                                        <td>{order.totalPrice}{CURRENCY}</td>
                                        <td>{order.isPaid ? (
                                            moment(order.paidAt).format('DD MMM YYYY')
                                        ) : (
                                            <i className='fas fa-times' style={{ color: 'red' }}></i>
                                        )}
                                        </td>
                                        <td>{order.isDelivered ? (
                                            order.deliveredAt.substring(0, 10)
                                        ) : (
                                            <i className='fas fa-times' style={{ color: 'red' }}></i>
                                        )}
                                        </td>
                                        
                                        <td>
                                            <LinkContainer to={`/order/${order._id}`}>
                                                <Button variant='light' className='btn-sm'>
                                                    Detalles
                                                </Button>
                                            </LinkContainer>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
        </div>
    )
}

export default OrderAdminListScreen

