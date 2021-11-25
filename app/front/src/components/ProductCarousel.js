import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import Spinner from './Spinner'
import Message from './Message'
import { listTop } from '../actions/productActions'
import { CURRENCY } from '../constants/productConstants'

function ProductCarousel() {
    const dispatch = useDispatch()
    const productTop = useSelector(state => state.productTop)
    const { e, loading, products } = productTop
    useEffect(() => {
        dispatch(listTop())
    }, [dispatch])
    return ( loading ? <Spinner/>
    :e
    ? <Message variant='danger'>{e}</Message>
    :(
        <Carousel pause='hover' className='bg-light'>
            {products.map(product => (
                <Carousel.Item key={product._id}>
                    <Link to={`/product/${product._id}`}>
                        <Image src={product.image} alt={product.name}/> 
                        <Carousel.Caption className='carousel.caption'>
                            <h4>{product.name}({product.price}{CURRENCY})</h4>
                        </Carousel.Caption>
                    </Link>
                </Carousel.Item>
            ))}
        </Carousel>
    )
        
    )
}

export default ProductCarousel
