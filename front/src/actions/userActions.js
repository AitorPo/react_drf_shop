/* 
***********
* ACTIONS *
***********
Funciones encargadas de actualizar el State de Redux que, a su vez,
maneja el State de los elementos/objetos de nuestro Front
*/
import axios from 'axios'
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_RESET,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
} from '../constants/userConstants'

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const { data } = await axios.post(
            '/api/users/login',
            { 'username': email, 'password': password },
            config
        )

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (e) {
        dispatch({
            type: USER_LOGIN_FAIL,
            // devolvemos un mensaje genérico (e.message) siempre y cuando
            // NO exista un mensaje de error devuelto por la API (e.response.data.message)
            payload: e.response && e.response.data.detail
                ? e.response.data.detail
                : e.message,
        })
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({ type: USER_LOGOUT })
    dispatch({ type: USER_DETAILS_RESET })
}

export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        })
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const { data } = await axios.post(
            '/api/users/register/',
            { 'name': name, 'email': email, 'password': password },
            config
        )

        // registramos al usuario
        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })
        // login automático después del registro
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (e) {
        dispatch({
            type: USER_REGISTER_FAIL,
            // devolvemos un mensaje genérico (e.message) siempre y cuando
            // NO exista un mensaje de error devuelto por la API (e.response.data.message)
            payload: e.response && e.response.data.detail
                ? e.response.data.detail
                : e.message,
        })
    }
}

export const retrieveUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DETAILS_REQUEST
        })
        const {
            userLogin: { userInfo }
        } = getState()
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(
            `/api/users/${id}`,
            config
        )

        // registramos al usuario
        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })
    } catch (e) {
        dispatch({
            type: USER_DETAILS_FAIL,
            // devolvemos un mensaje genérico (e.message) siempre y cuando
            // NO exista un mensaje de error devuelto por la API (e.response.data.message)
            payload: e.response && e.response.data.detail
                ? e.response.data.detail
                : e.message,
        })
    }
}

export const updateProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST
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
            `/api/users/update/`,
            user,
            config
        )

        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (e) {
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: e.response && e.response.data.detail
                ? e.response.data.detail
                : e.message,
        })
    }
}