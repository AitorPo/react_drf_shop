// Los reducers son los componentes encargados de actualizar el elemento 'store' de Redux
import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_RESET,
    PRODUCT_EDIT_SUCCESS,
    PRODUCT_EDIT_FAIL,
    PRODUCT_EDIT_REQUEST,
    PRODUCT_EDIT_RESET,
    PRODUCT_REVIEW_SUCCESS,
    PRODUCT_REVIEW_FAIL,
    PRODUCT_REVIEW_REQUEST,
    PRODUCT_REVIEW_RESET,
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

export const productDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_DELETE_REQUEST:
            // devolvemos un array con toda la información del estado (state) del producto con Spread (...) mientras se carga toda la información (loading=true)
            return { loading: true }
        case PRODUCT_DELETE_SUCCESS:
            // devolvemos una carga de datos (action.payload) ya que se ha finalizada la carga de los mismos (loading=false)
            return { loading: false, success: true }
        case PRODUCT_DELETE_FAIL:
            // devolvemos una error (e) en la carga de datos (action.payload), si falla, una vez finalizada la carga (loading=false)
            return { loading: false, e: action.payload }
        // Si por algún motivo el reducer falla y no entra en ninguno de los tres CASE devolvemos el estado inicial del objeto
        default:
            return state
    }
}

export const productCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_CREATE_REQUEST:
            // devolvemos un array con toda la información del estado (state) del producto con Spread (...) mientras se carga toda la información (loading=true)
            return { loading: true }
        case PRODUCT_CREATE_SUCCESS:
            // devolvemos una carga de datos (action.payload) ya que se ha finalizada la carga de los mismos (loading=false)
            return { loading: false, success: true, product:action.payload }
        case PRODUCT_CREATE_FAIL:
            // devolvemos una error (e) en la carga de datos (action.payload), si falla, una vez finalizada la carga (loading=false)
            return { loading: false, e: action.payload }
        case PRODUCT_CREATE_RESET:
            return {}
        // Si por algún motivo el reducer falla y no entra en ninguno de los tres CASE devolvemos el estado inicial del objeto
        default:
            return state
    }
}

export const productEditReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case PRODUCT_EDIT_REQUEST:
            // devolvemos un array con toda la información del estado (state) del producto con Spread (...) mientras se carga toda la información (loading=true)
            return { loading: true }
        case PRODUCT_EDIT_SUCCESS:
            // devolvemos una carga de datos (action.payload) ya que se ha finalizada la carga de los mismos (loading=false)
            return { loading: false, success: true, product:action.payload }
        case PRODUCT_EDIT_FAIL:
            // devolvemos una error (e) en la carga de datos (action.payload), si falla, una vez finalizada la carga (loading=false)
            return { loading: false, e: action.payload }
        // Si por algún motivo el reducer falla y no entra en ninguno de los tres CASE devolvemos el estado inicial del objeto
        case PRODUCT_EDIT_RESET:
            return { product: {} }
        default:
            return state
    }
}

export const productReviewReducer = (state = { }, action) => {
    switch (action.type) {
        case PRODUCT_REVIEW_REQUEST:
            // devolvemos un array con toda la información del estado (state) del producto con Spread (...) mientras se carga toda la información (loading=true)
            return { loading: true }
        case PRODUCT_REVIEW_SUCCESS:
            // devolvemos una carga de datos (action.payload) ya que se ha finalizada la carga de los mismos (loading=false)
            return { loading: false, success: true }
        case PRODUCT_REVIEW_FAIL:
            // devolvemos una error (e) en la carga de datos (action.payload), si falla, una vez finalizada la carga (loading=false)
            return { loading: false, e: action.payload }
        // Si por algún motivo el reducer falla y no entra en ninguno de los tres CASE devolvemos el estado inicial del objeto
        case PRODUCT_REVIEW_RESET:
            return {}
        default:
            return state
    }
}