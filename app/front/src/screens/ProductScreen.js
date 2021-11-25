import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import Spinner from '../components/Spinner'
import Message from '../components/Message'
import moment from 'moment'
import { listProductDetails, reviewProduct } from '../actions/productActions'
import { CURRENCY, PRODUCT_REVIEW_RESET } from '../constants/productConstants'

function ProductScreen({ match, history }) {
    // definimos una variable (units), un método para actualizarla (setUnits) y un valor inicial (setUnits(1))
    const [units, setUnits] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    // constante que gestionará la llamada a la API desde Redux
    const dispatch = useDispatch()
    // constante que funciona como puntero que selecciona el valor actual del objeto y lo actualiza en el state de Redux
    const productDetails = useSelector(state => state.productDetails)
    const { loading, e, product } = productDetails
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const productReview = useSelector(state => state.productReview)
    const { success: successReview, loading: loadingReview, e: errReview } = productReview

    useEffect(() => {
        if (successReview) {
            // Reseteo del formulario una vez enviada la valoración
            setRating(0)
            setComment('')
            dispatch({ type: PRODUCT_REVIEW_RESET })
        }
        // llamada a la API para mostrar los detealles de un producto según el id de la url
        dispatch(listProductDetails(match.params.id))
        // pasamos los datos de la llamada y la url para evitar un loop infinito en el que
        // el estado interno del componente nunca pare de ejecutarse y, por lo tanto, nunca se interprete como montado (mounted)
        // de este modo, el montaje y el estado interno del componente Product finalizará al obtener los datos requeridos
        // y volverá a iniciarse SOLO cuando los datos de la request sean diferentes a los actuales
    }, [dispatch, match, successReview])

    const addToCart = () => {
        console.log('add id:', match.params.id)
        history.push(`/cart/${match.params.id}?units=${units}`)
    }

    const submitHandler = (event) => {
        event.preventDefault()
        dispatch(reviewProduct(
            match.params.id,
            {
                rating,
                comment
            }
        ))
    }

    return (
        <div>
            <Link to='/' className='btn btn-light my-3'>Atrás</Link>
            {
                loading ?
                    <Spinner />
                    : e
                        ? <Message variant='danger'>{e}</Message>
                        : (
                            <div>
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
                                        <ListGroup>
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

                                            {product.countInStock > 0 && (
                                                <ListGroup.Item>
                                                    <Row>
                                                        <Col>Unidades</Col>
                                                        <Col xs='auto' className='mx-5'>
                                                            <Form.Control as="select"
                                                                value={units}
                                                                onChange={(e) => setUnits(e.target.value)}>
                                                                {
                                                                    // Constructor de arrays en línea
                                                                    // Crea tantos elementos como stock exista [0, 1, 2...]
                                                                    [...Array(product.countInStock).keys()].map((x) => (
                                                                        <option key={x + 1} value={x + 1}>
                                                                            {x + 1}
                                                                        </option>
                                                                    ))
                                                                }
                                                            </Form.Control>
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            )}

                                            <ListGroup.Item>
                                                <Button className='btn-block w-100'
                                                    disabled={product.countInStock <= 0}
                                                    type='button'
                                                    onClick={addToCart}
                                                >Añadir al carrito</Button>
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <h4>Valoraciones</h4>
                                        {product.reviews.length <= 0 && <Message variant='info'>Sin valoraciones</Message>}
                                        <ListGroup variant='flush'>
                                            {product.reviews.map((review) => (
                                                <ListGroup.Item key={review._id}>
                                                    <strong>{review.name}</strong>
                                                    <Rating value={review.rating} color='#f8e825' />
                                                    <p>{moment(review.createdAt).format('DD MMM YYYY')}</p>
                                                    <p>{review.comment}</p>
                                                </ListGroup.Item>
                                            ))}
                                            <ListGroup.Item>
                                                <h4>Escribe tu valoración</h4>
                                                {loadingReview && <Spinner />}
                                                {successReview && <Message variant='success'>Valoración enviada</Message>}
                                                {errReview && <Message variant='danger'>{errReview}</Message>}
                                                {userInfo ? (
                                                    <Form onSubmit={submitHandler}>
                                                        <Form.Group controlId='rating'>
                                                            <Form.Label>Puntuación</Form.Label>
                                                            <Form.Control
                                                                as='select'
                                                                value={rating}
                                                                onChange={(event) => setRating(event.target.value)}
                                                            >
                                                                <option value=''>Selecciona...</option>
                                                                <option value='1'>1 - Mala</option>
                                                                <option value='2'>2 - Mejorable</option>
                                                                <option value='3'>2 - Buena</option>
                                                                <option value='4'>2 - Muy buena</option>
                                                                <option value='5'>2 - Excelente</option>
                                                            </Form.Control>
                                                        </Form.Group>
                                                        <Form.Group controlId='comment'>
                                                            <Form.Label>Valoración</Form.Label>
                                                            <Form.Control
                                                                as='textarea'
                                                                row='5'
                                                                value={comment}
                                                                onChange={(event) => setComment(event.target.value)}
                                                            ></Form.Control>
                                                        </Form.Group>
                                                        <Button
                                                            disabled={loadingReview}
                                                            type='submit'
                                                            variant='primary'
                                                            className='mt-2'
                                                        >
                                                            Enviar
                                                        </Button>
                                                    </Form>
                                                ) : (
                                                    <Message variant='info'><Link to='/login'>Inicia sesión</Link></Message>
                                                )}
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Col>
                                </Row>
                            </div>
                        )
            }
        </div>
    )
}

export default ProductScreen
