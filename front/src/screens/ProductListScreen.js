import React, { useState, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../components/Spinner'
import Message from '../components/Message'
import { listProducts, deleteProduct, createProduct } from '../actions/productActions'
import { CURRENCY } from '../constants/productConstants'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'

function ProductListScreen({ match, history }) {
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const { loading, e, products } = productList
    const productDelete = useSelector(state => state.productDelete)
    const { loading:loadingDelete, e:errDelete, success:successDelete } = productDelete
    const productCreate = useSelector(state => state.productCreate)
    const { loading:loadingCreate, e:errCreate, success:successCreate, product:createdProduct } = productCreate
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    
    useEffect(() => {
        dispatch({type:PRODUCT_CREATE_RESET})
        if(!userInfo.isAdmin){
            history.push('/login')
        }
        if(successCreate){
            history.push(`/admin/product/${createdProduct._id}/edit`)
        }else{
            dispatch(listProducts())
        }
    }, [dispatch, history, userInfo, successDelete, successCreate, createdProduct])

    const deleteHandler = (id) => {
        if (window.confirm('¿Desear eliminar este producto?')) {
            dispatch(deleteProduct(id))
        }
    }
    const createProductHandler = (product) => {
        dispatch(createProduct())
    }
    return (
        <div>
            <Row className='align-items-center'>
                <Col>
                    <h1>Productos</h1>
                </Col>
                <Col className='text-right'>
                    <Button className='my-3' onClick={createProductHandler}>
                        <i className='fas fa-plus'></i> Crear producto
                    </Button>
                </Col>
            </Row>
            {loadingDelete && <Spinner/>}
            {errDelete && <Message variant='danger'>{errDelete}</Message>}

            {loadingCreate && <Spinner/>}
            {errCreate && <Message variant='danger'>{errCreate}</Message>}
            {loading
                ? (<Spinner />)
                : e
                    ? (<Message variant='danger'>{e}</Message>)
                    : (
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NOMBRE</th>
                                    <th>PRECIO</th>
                                    <th>CATEGORÍA</th>
                                    <th>MARCA</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                {products.map(product => (
                                    <tr key={product._id}>
                                        <td>{product._id}</td>
                                        <td>{product.name}</td>
                                        <td>{product.price}{CURRENCY}</td>
                                        <td>{product.category}</td>
                                        <td>{product.brand}</td>

                                        <td>
                                            <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                                <Button variant='light' className='btn-sm'>
                                                    <i className='fas fa-edit'></i>
                                                </Button>
                                            </LinkContainer>

                                            <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(product._id)}>
                                                <i className='fas fa-trash'></i>
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
        </div>
    )
}

export default ProductListScreen
