// Los reducers son los componentes encargados de actualizar el elemento 'store' de Redux
import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
} from '../constants/productConstants'

export const productListReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            // devolvemos un array vacío porque seguimos cargando toda la información (loading=true)
            return { loading: true, products: [] }
        case PRODUCT_LIST_SUCCESS:
            // devolvemos una carga de datos (action.payload) ya que se ha finalizada la carga de los mismos (loading=false)
            return { loading: false, products: action.payload }
        case PRODUCT_LIST_FAIL:
            // devolvemos una error (e) en la carga de datos (action.payload), si falla, una vez finalizada la carga (loading=false)
            return { loading: false, e: action.payload }
        // Si por algún motivo el reducer falla y no entra en ninguno de los tres CASE devolvemos el estado inicial del objeto
        default:
            return state
    }
}

export const productDetailsReducer = (state = { product: {reviews:[]} }, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            // devolvemos un array con toda la información del estado (state) del producto con Spread (...) mientras se carga toda la información (loading=true)
            return { loading: true, ...state }
        case PRODUCT_DETAILS_SUCCESS:
            // devolvemos una carga de datos (action.payload) ya que se ha finalizada la carga de los mismos (loading=false)
            return { loading: false, product: action.payload }
        case PRODUCT_DETAILS_FAIL:
            // devolvemos una error (e) en la carga de datos (action.payload), si falla, una vez finalizada la carga (loading=false)
            return { loading: false, e: action.payload }
        // Si por algún motivo el reducer falla y no entra en ninguno de los tres CASE devolvemos el estado inicial del objeto
        default:
            return state
    }
}