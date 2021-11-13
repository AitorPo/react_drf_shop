import axios from 'axios'
import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL
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
            payload: e.response && e.response.data.message
            ? e.response.data.message
            : e.message,
        })
    }
}