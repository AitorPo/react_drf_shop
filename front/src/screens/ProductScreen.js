import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button } from 'react-bootstrap'
import Rating from '../components/Rating'
import axios from 'axios'
import { CURRENCY } from '../constants/productConstants'

function ProductScreen({ match }) {
    const [product, setProduct] = useState([])

    useEffect(() => {
        async function getProduct(){
            const {data} = await axios.get(`/api/products/${match.params.id}`)
            console.log(`/api/products/${match.params.id}`)
            setProduct(data)
        }
        getProduct()
    }, [])

    return (
        <div>
            <Link to='/' className='btn btn-light my-3'>Atrás</Link>
            <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid />
                </Col>
                <Col md={3}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Rating value={product.rating} text={`${product.numReviews} valoraciones`} color={'#f8e825'} />
                        </ListGroup.Item>

                        <ListGroup.Item>
                            {product.price}{CURRENCY}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            {product.brand}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            {product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                
                <Col md={3}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    Precio:
                                </Col>
                                <Col>
                                    <strong>{product.price}{CURRENCY}</strong>
                                </Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    Estado:
                                </Col>
                                <Col>
                                    {product.countInStock > 0 ? 'En stock' : 'Sin stock'}
                                </Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Button className='btn-block w-100'
                                    disabled={product.countInStock === 0}
                                    type='button'
                            >Añadir al carrito</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </div>
    )
}

export default ProductScreen
