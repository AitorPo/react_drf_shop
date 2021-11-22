import axios from 'axios'
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
    PRODUCT_EDIT_REQUEST,
    PRODUCT_EDIT_SUCCESS,
    PRODUCT_EDIT_FAIL,
} from '../constants/productConstants'

// dispatch es una función que gestiona el tipo de 'action' (petición) 
// para generar una respuesta u otra en función de la respuesta obtenida
export const listProducts = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST })
        const { data } = await axios.get('/api/products/')
        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })
    } catch (e) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            // devolvemos un mensaje genérico (e.message) siempre y cuando
            // NO exista un mensaje de error devuelto por la API (e.response.data.message)
            payload: e.response && e.response.data.detail
                ? e.response.data.detail
                : e.message,
        })
    }
}

export const listProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST })
        const { data } = await axios.get(`/api/products/${id}`)
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })
    } catch (e) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            // devolvemos un mensaje genérico (e.message) siempre y cuando
            // NO exista un mensaje de error devuelto por la API (e.response.data.message)
            payload: e.response && e.response.data.detail
                ? e.response.data.detail
                : e.message,
        })
    }
}

export const deleteProduct = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_DELETE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.delete(
            `/api/products/delete/?id=${id}`,
            config
        )

        dispatch({
            type: PRODUCT_DELETE_SUCCESS,
        })

    } catch (e) {
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: e.response && e.response.data.detail
                ? e.response.data.detail
                : e.message,
        })
    }
}

export const createProduct = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_CREATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(
            `/api/products/create/sample/`,
            {},
            config,
        )

        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: data
        })

    } catch (e) {
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload: e.response && e.response.data.detail
                ? e.response.data.detail
                : e.message,
        })
    }
}

export const editProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_EDIT_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(
            `/api/products/update/?id=${product._id}`,
            product,
            config,
        )

        dispatch({
            type: PRODUCT_EDIT_SUCCESS,
            payload: data
        })

        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data })

    } catch (e) {
        dispatch({
            type: PRODUCT_EDIT_FAIL,
            payload: e.response && e.response.data.detail
                ? e.response.data.detail
                : e.message,
        })
    }
}