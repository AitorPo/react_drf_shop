import { Container } from 'react-bootstrap'
import { HashRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderAdminListScreen from './screens/OrderAdminListScreen';

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
            <Route path='/' component={HomeScreen} exact/>
            <Route path='/login' component={LoginScreen} />
            <Route path='/profile' component={ProfileScreen} />
            <Route path='/register' component={RegisterScreen} />
            <Route path='/shipping' component={ShippingScreen} />
            <Route path='/place-order' component={PlaceOrderScreen} />
            <Route path='/order/:id' component={OrderScreen} />
            <Route path='/payment' component={PaymentScreen} />
            <Route path='/product/:id' component={ProductScreen} />
            <Route path='/cart/:id?' component={CartScreen} />

            <Route path='/admin/list_users' component={UserListScreen} />
            <Route path='/admin/product_list' component={ProductListScreen} />
            <Route path='/admin/order_list' component={OrderAdminListScreen} />

            <Route path='/admin/user/:id/edit' component={UserEditScreen} />
            <Route path='/admin/product/:id/edit' component={ProductEditScreen} />
        </Container>
      </main>  
      <Footer />
    </Router>
  );
}

export default App;
