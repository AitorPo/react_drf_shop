/* 
***********
* SCREENS *
***********
Junto con los "Components" nos ayudan a "pintar" el HTML y boostrap
de nuestras secciones de contenido definidas en el front. Las "Screens" 
van más alla que los "Components" ya que en estos ficheros añadimos
funcionalidades de scripts de React y Redux (JavaScript)
*/

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Carousel } from 'react-bootstrap'
import Product from '../components/Product'
import { listProducts } from '../actions/productActions'
import ProductCarousel from '../components/ProductCarousel'
import Spinner from '../components/Spinner'
import Message from '../components/Message'
import Paginate from '../components/Paginate'

function HomeScreen({ history }) {
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    // Destructuring de los 'key' de productReducer
    const { e, loading, products, page, pages } = productList
    /* uso de useEffect = utiliza todo lo generado en actions/productActions/listProducts para modificarlo
                          Ponemos un array vacío al final de useEffect porque solo queremos que 
                          la estructura de datos (array) se actualice cuando se cargue el componente y no
                          en cada elemento que contiene
    */
    let keyword = history.location.search

    useEffect(() => {
        console.log('useEffect')
        dispatch(listProducts(keyword))
    }, [dispatch, keyword])

    return (
        <div>
            {!keyword && <ProductCarousel />}
            
            <h1>Novedades</h1>
            {/* Renderiza el mensaje entre los <h2> si está cargando datos */}
            {loading ? <Spinner />
                // Si ha habido algún error renderizará el mensaje de error (e)
                : e ? <Message variant='danger'>{e}</Message>
                    :
                    // Si todo sale bien devuelve los datos
                    <div>
                        <Row>
                            {products.map(product => (
                                // Responsive según el tamaño de pantalla en el que se muestre
                                <Col className='mt-3' key={product._id} sm={12} md={6} lg={4} xl={3}>
                                    <Product product={product} />
                                </Col>

                            ))}
                        </Row>
                        <Paginate page={page} pages={pages} keyword={keyword}/>
                    </div>
            }
        </div>
    )
}

export default HomeScreen
