import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../components/Spinner'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { listProductDetails, editProduct } from '../actions/productActions'
import { PRODUCT_EDIT_RESET } from '../constants/productConstants'

function ProductEditScreen({ match, history }) {
    const productId = match.params.id
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [category, setCategory] = useState('')
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [description, setDescription] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [uploading, setUploading] = useState(false)
    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const { e, loading, product } = productDetails
    const productEdit = useSelector(state => state.productEdit)
    const { e: errorEdit, loading: loadingEdit, success: successEdit } = productEdit

    useEffect(() => {
        if (successEdit) {
            dispatch({ type: PRODUCT_EDIT_RESET })
            history.push('/admin/product_list')
        } else {
            if (!product.name || product._id !== Number(productId)) {
                dispatch(listProductDetails(productId))
            } else {
                setName(product.name)
                setPrice(product.price)
                setCategory(product.category)
                setImage(product.image)
                setBrand(product.brand)
                setDescription(product.description)
                setCountInStock(product.countInStock)
            }
        }
    }, [dispatch, product, productId, history, successEdit])

    const submitHandler = (event) => {
        event.preventDefault()
        dispatch(editProduct({
            _id: productId,
            name,
            price,
            image,
            brand,
            category,
            countInStock,
            description
        }))
    }
    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()

        formData.append('image', file)
        formData.append('product_id', productId)

        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post('/api/products/upload/', formData, config)


            setImage(data)
            setUploading(false)

        } catch (error) {
            setUploading(false)
        }
    }
    return (
        <div>
            <Link to='/admin/product_list'>Atrás</Link>
            <FormContainer>
                <h1>Editar producto</h1>
                {loadingEdit && <Spinner />}
                {errorEdit && <Message variant='danger'>{errorEdit}</Message>}
                {loading ? <Spinner /> : e ? <Message variant='danger'>{e}</Message>
                    : (
                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId='name'>
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control
                                    type='name'
                                    placeholder='Nombre...'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId='price'>
                                <Form.Label>Precio</Form.Label>
                                <Form.Control
                                    type='number'
                                    placeholder='Precio...'
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId='image'>
                                <Form.Label>Imagen</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Imagen...'
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                >
                                </Form.Control>
                                <Form.File
                                    id='image-file'
                                    label='Elige imagen'
                                    custom
                                    onChange={uploadFileHandler}
                                >
                                </Form.File>
                                {uploading && <Spinner/>}
                            </Form.Group>
                            <Form.Group controlId='brand'>
                                <Form.Label>Marca</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Marca...'
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId='category'>
                                <Form.Label>Categoría</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Categoría...'
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId='countInStock'>
                                <Form.Label>Stock</Form.Label>
                                <Form.Control
                                    type='number'
                                    placeholder='Stock...'
                                    value={countInStock}
                                    onChange={(e) => setCountInStock(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId='description'>
                                <Form.Label>Descripción</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Descripción...'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>
                            <Button className='mt-2' type='submit' variant='primary'>Actualizar</Button>
                        </Form>
                    )}

            </FormContainer>
        </div>
    )
}

export default ProductEditScreen
