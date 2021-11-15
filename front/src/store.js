import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducer, productDetailsReducer } from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'

// seteamos la constante 'reducer' con el funcionamiento del custom reducer creado en ./reducers
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer
})

// 'Desparseamos' los datos del localstorage para convertirlos a su estado original de objeto de JS
const cartItemsFromLocalStorage = localStorage.getItem('cartItems') ?
    // Si los datos existes, se convertirán a objeto JSON
    JSON.parse(localStorage.getItem('cartItems'))
    // En caso contrario devolverá un array vacío
    : []

const initialState = {
    cart: { cartItems: cartItemsFromLocalStorage }
}

const middleware = [thunk]

// ... = Spread operator = permite pasar todos los elementos de un array a la vez y que JS lo interprete
const store = createStore(reducer, initialState,
    composeWithDevTools(applyMiddleware(...middleware)))

export default store