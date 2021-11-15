import axios from 'axios'
import { ADD_ITEM, REMOVE_ITEM } from '../constants/cartConstants'

export const addToCart = (id, units) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`)

    dispatch({
        type: ADD_ITEM,
        payload: {
            id: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            units
        }
    })
    // Tenemos que parsear el 'value' del localstorage porque solo acepta strings
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: REMOVE_ITEM,
        payload: id
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}