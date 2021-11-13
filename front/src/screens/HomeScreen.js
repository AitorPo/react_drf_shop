import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import axios from 'axios'

import products from '../products'

function HomeScreen(){
    /* Uso de useState = genera una estructura de datos, un método y un valor inicial
                         sobre el cual iteraremos y modificaremos su valor
        1 -> definimos un array de elementos (products)
        2 -> definimos un método que actualizará dicho array (setProducts)
        3 -> definimos el valor original/inicial del array (useState([])) 
    */
    const[products, setProducts] = useState([])

    /* uso de useEffect = utiliza todo lo generado en useState para modificarlo
                          Ponemos un array vacío al final de useEffect porque solo queremos que 
                          la estructura de datos (array) se actualice cuando se cargue el componente y no
                          en cada elemento que contiene
    */
    useEffect(() => {
        console.log('useEffect')
        // Usamos async-await en vez de promesas (.then()) para aportar actualidad al código
        async function getProducts(){
            const { data } = await axios.get('/api/products/')
            setProducts(data)
        }
        getProducts()
    }, [])

        return (
                <div>
                    <h1>Novedades</h1>
                    <Row>
                        {products.map(product => (
                            // Responsive según el tamaño de pantalla en el que se muestre
                            <Col className='mt-3' key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product} />
                            </Col>

                        ))}
                    </Row>
                </div>
        )   
    }

export default HomeScreen
