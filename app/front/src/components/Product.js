import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
import { Link } from 'react-router-dom'
import { CURRENCY } from '../constants/productConstants'

function Product({ product }) {
    return (
        <React.Fragment>
        <Card className='p-1 rounded h-100'>
            <Link to={`/product/${product._id}`}>
                <Card.Img src={product.image}/>
            </Link>
            <Card.Body>
                <Link to={`/product/${product._id}`}>
                    <Card.Title as='div'>
                        <strong>{product.name}</strong>
                    </Card.Title>
                </Link>

                <Card.Text as='div'>
                    <div className='my-3'>
                        <Rating value={product.rating} text={`${product.numReviews} valoraciones`} color={'#f8e825'}/>
                    </div>
                </Card.Text>

                <Card.Text as='h3'>
                    {product.price}{CURRENCY}
                </Card.Text>
            </Card.Body>
        </Card>
        </React.Fragment>
    )
}

export default Product
