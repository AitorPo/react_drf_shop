import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart as remove } from '../actions/cartActions'
import { CURRENCY } from '../constants/productConstants'

function CartScreen({ match, location, history }) {
    const productId = match.params.id
    // Solo necesitamos el valor numérico del parámetro units (Number(split()[pos])).
    // Hacemos un split('=') y separamos ambos valores (?units) y (nº) convirtiéndolo en un array
    // Si no existe el param units este será igual a 1 (: 1)
    const units = location.search ? Number(location.search.split('=')[1]) : 1

    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, units))
        }
        // Pasamos todos los valores en este array para que se actualice el state cuando el componente se monte (mount)
        // Si no lo hacemos nunca se montará y entrará en bucle infinito provocando comportamientos no deseados en la app
    }, [dispatch, productId, units])

    const removeFromCart = (id) => {
        dispatch(remove(id))
    }

    const checkOut = () => {
        history.push('/login?redirect=shipping')
    }

    return (
        <Row>
            <Col md={8}>
                <h1>Carrito</h1>
                {cartItems.length === 0 ? (
                    <Message variant='info'>
                        Tu carrito está vacío. <Link to='/'>Volver</Link>
                    </Message>
                ) : (
                    <ListGroup variant='flush'>
                        {cartItems.map(item => (
                            <ListGroup.Item key={item.id}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded />
                                    </Col>
                                    <Col md={3} className='my-2'>
                                        <Link to={`/product/${item.id}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={2} className='my-2'>
                                        {item.price}{CURRENCY}
                                    </Col>
                                    <Col md={3}>
                                        <Form.Control as="select"
                                            value={item.units}
                                            onChange={(e) => dispatch(addToCart(item.id, Number(e.target.value)))}>
                                            {
                                                // Constructor de arrays en línea
                                                // Crea tantos elementos como stock exista [0, 1, 2...]
                                                [...Array(item.countInStock).keys()].map((x) => (
                                                    <option key={x + 1} value={x + 1}>
                                                        {x + 1}
                                                    </option>
                                                ))
                                            }
                                        </Form.Control>
                                    </Col>
                                    <Col md={1}>
                                        <Button
                                            type='button'
                                            variant='light'
                                            onClick={() => removeFromCart(item.id)}
                                        >
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col>

            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            {/* reduce toma dos params. En la arrow function sumamos los elementos y los acumulamos en counter
                                mientras que el valor inicial a partir del cual empezamos a acumular es 0 (, 0)
                            */}
                            <h4>Subtotal ({cartItems.reduce((counter, item) => counter + item.units, 0)}) productos</h4>
                            <h2>{cartItems.reduce((counter, item) => counter + item.units * item.price, 0).toFixed(2)}{CURRENCY}</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button
                                type='button'
                                className='btn-block w-100'
                                disabled={cartItems.length === 0}
                                onClick={checkOut}
                            >
                                Pagar
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}

export default CartScreen
