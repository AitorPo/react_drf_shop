import axios from 'axios'
import {
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_FAIL,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_FAIL,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_REQUEST,
    ORDER_PAY_FAIL,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_REQUEST,
    ORDER_LIST_FAIL,
    ORDER_ADMIN_LIST_SUCCESS,
    ORDER_ADMIN_LIST_REQUEST,
    ORDER_ADMIN_LIST_FAIL,
    ORDER_DELIVER_SUCCESS,
    ORDER_DELIVER_REQUEST,
    ORDER_DELIVER_FAIL,
} from '../constants/orderConstants'

import { CART_CLEAR_ITEMS } from '../constants/cartConstants'

export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_CREATE_REQUEST
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
            `/api/orders/add/`,
            order,
            config
        )

        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data
        })

        dispatch({
            type: CART_CLEAR_ITEMS,
            payload: data
        })

        localStorage.removeItem('cartItems')

    } catch (e) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: e.response && e.response.data.detail
                ? e.response.data.detail
                : e.message,
        })
    }
}

export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_DETAILS_REQUEST
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

        const { data } = await axios.get(
            `/api/orders/order/?id=${id}`,
            config
        )

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data
        })

    } catch (e) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: e.response && e.response.data.detail
                ? e.response.data.detail
                : e.message,
        })
    }
}

export const payOrder = (id, paymentResponse) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_PAY_REQUEST
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
            `/api/orders/pay/?id=${id}`,
            paymentResponse,
            config
        )

        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data
        })

    } catch (e) {
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: e.response && e.response.data.detail
                ? e.response.data.detail
                : e.message,
        })
    }
}

export const getOrderList = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_LIST_REQUEST
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

        const { data } = await axios.get(
            `/api/orders/my-orders`,
            config
        )

        dispatch({
            type: ORDER_LIST_SUCCESS,
            payload: data
        })

    } catch (e) {
        dispatch({
            type: ORDER_LIST_FAIL,
            payload: e.response && e.response.data.detail
                ? e.response.data.detail
                : e.message,
        })
    }
}

export const getOrderAdminList = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_ADMIN_LIST_REQUEST
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

        const { data } = await axios.get(
            `/api/orders/list-orders`,
            config
        )

        dispatch({
            type: ORDER_ADMIN_LIST_SUCCESS,
            payload: data
        })

    } catch (e) {
        dispatch({
            type: ORDER_ADMIN_LIST_FAIL,
            payload: e.response && e.response.data.detail
                ? e.response.data.detail
                : e.message,
        })
    }
}

export const deliverOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_DELIVER_REQUEST
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
            `/api/orders/deliver/?id=${order._id}`,
            {},
            config
        )

        dispatch({
            type: ORDER_DELIVER_SUCCESS,
            payload: data
        })

    } catch (e) {
        dispatch({
            type: ORDER_DELIVER_FAIL,
            payload: e.response && e.response.data.detail
                ? e.response.data.detail
                : e.message,
        })
    }
}