/* 
**************
* COMPONENTS *
**************
Son los "ficheros .html" de React. Junto a las "Screens"
"pintamos" todo el HTML, junto con el boostrap aplicado, en nuestro front
todo mediante ficheros .js
*/

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import searchBox from './SearchBox'
import { logout as makeLogout } from '../actions/userActions'
import SearchBox from './SearchBox'

function Header() {
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const dispatch = useDispatch()
    const logout = () => {
        dispatch(makeLogout())
    }

    return (
        <header>
            <Navbar bg='light' variant='light' expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        {/* Utilizamos LinkContainer para crear la funcionalidad de SPA y 
                            que la web no recarge al pulsar links
                        */}
                        <Navbar.Brand>APG's Shop</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <SearchBox/>
                        <Nav className="ml-auto">
                            <LinkContainer to='/cart'>
                                <Nav.Link><i className="fas fa-shopping-cart"></i> Carrito</Nav.Link>
                            </LinkContainer>

                            {userInfo ? (
                                <NavDropdown title={userInfo.name} id='username'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>Perfil</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logout}>Salir</NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <LinkContainer to='/login'>
                                    <Nav.Link><i className="fas fa-user"></i> Iniciar sesi??n</Nav.Link>
                                </LinkContainer>
                            )}
                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title='Admin' id='adminMenu'>
                                    <LinkContainer to='/admin/list_users'>
                                        <NavDropdown.Item>Usuarios</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/product_list'>
                                        <NavDropdown.Item>Productos</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/order_list'>
                                        <NavDropdown.Item>Pedidos</NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}


export default Header
