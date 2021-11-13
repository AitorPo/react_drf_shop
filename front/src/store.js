import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducer } from './reducers/productReducers'

// seteamos la constante 'reducer' con el funcionamiento del custom reducer creado en ./reducers
const reducer = combineReducers({
    productList: productListReducer
})

const initialState = {}

const middleware = [thunk]

// ... = Spread operator = permite pasar todos los elementos de un array a la vez y que JS lo interprete
const store = createStore(reducer, initialState, 
              composeWithDevTools(applyMiddleware(...middleware))) 

export default store