import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducer, productDetailsReducer, productDeleteReducer, productCreateReducer, productEditReducer, productReviewReducer } from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer, userListReducer, userDeleteReducer, userEditReducer } from './reducers/userReducers'
import { orderCreateReducer, orderDetailsReducer, orderPayReducer, orderListReducer, orderAdminListReducer, orderDeliverReducer } from './reducers/orderReducers'

// seteamos la constante 'reducer' con el funcionamiento del custom reducer creado en ./reducers
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productEdit: productEditReducer,
    productReview: productReviewReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdate: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userEdit: userEditReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderList: orderListReducer,
    orderAdminList: orderAdminListReducer,
    orderDeliver: orderDeliverReducer,
})

// 'Desparseamos' los datos del localstorage para convertirlos a su estado original de objeto de JS
const cartItemsFromLocalStorage = localStorage.getItem('cartItems') ?
    // Si los datos existes, se convertirán a objeto JSON
    JSON.parse(localStorage.getItem('cartItems'))
    // En caso contrario devolverá un array vacío
    : []

const userInfoFromLocalStorage = localStorage.getItem('userInfo') ?
    // Si los datos existes, se convertirán a objeto JSON
    JSON.parse(localStorage.getItem('userInfo'))
    // En caso contrario devolverá un null
    : null

const shippingInfoFromLocalStorage = localStorage.getItem('shippingInfo') ?
    // Si los datos existes, se convertirán a objeto JSON
    JSON.parse(localStorage.getItem('shippingInfo'))
    // En caso contrario devolverá un objeto vacío
    : {}


const initialState = {
    cart: { cartItems: cartItemsFromLocalStorage, shippingInfo: shippingInfoFromLocalStorage },
    userLogin: { userInfo: userInfoFromLocalStorage },
}

const middleware = [thunk]

// ... = Spread operator = permite pasar todos los elementos de un array a la vez y que JS lo interprete
const store = createStore(reducer, initialState,
    composeWithDevTools(applyMiddleware(...middleware)))

export default store