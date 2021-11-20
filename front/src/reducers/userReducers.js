/* 
************
* REDUCERS *
************
Funciones encargadas de gestionar el tipo de "llamada/acción",
y los datos que devuelve, desencadenados por la interacción 
de l@s usuari@s con nuestro front
*/
import { USER_LOGIN_REQUEST,
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
         USER_UPDATE_PROFILE_RESET,
} from '../constants/userConstants'

export const userLoginReducer = (state = { }, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            // devolvemos un array vacío porque seguimos cargando toda la información (loading=true)
            return { loading: true }
        case USER_LOGIN_SUCCESS:
            // devolvemos una carga de datos (action.payload) ya que se ha finalizada la carga de los mismos (loading=false)
            return { loading: false, userInfo: action.payload }
        case USER_LOGIN_FAIL:
            // devolvemos una error (e) en la carga de datos (action.payload), si falla, una vez finalizada la carga (loading=false)
            return { loading: false, e: action.payload }
        case USER_LOGOUT:
            // Limpamos los datos del user
            return {}
            // Si por algún motivo el reducer falla y no entra en ninguno de los tres CASE devolvemos el estado inicial del objeto
        default:
            return state
    }
}

export const userRegisterReducer = (state = { }, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            // devolvemos un array vacío porque seguimos cargando toda la información (loading=true)
            return { loading: true }
        case USER_REGISTER_SUCCESS:
            // devolvemos una carga de datos (action.payload) ya que se ha finalizada la carga de los mismos (loading=false)
            return { loading: false, userInfo: action.payload }
        case USER_REGISTER_FAIL:
            // devolvemos una error (e) en la carga de datos (action.payload), si falla, una vez finalizada la carga (loading=false)
            return { loading: false, e: action.payload }
        case USER_LOGOUT:
            // Limpamos los datos del user
            return {}
            // Si por algún motivo el reducer falla y no entra en ninguno de los tres CASE devolvemos el estado inicial del objeto
        default:
            return state
    }
}

export const userDetailsReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case USER_DETAILS_REQUEST:
            // devolvemos un array vacío porque seguimos cargando toda la información (loading=true)
            return { ...state, loading: true }
        case USER_DETAILS_SUCCESS:
            // devolvemos una carga de datos (action.payload) ya que se ha finalizada la carga de los mismos (loading=false)
            return { loading: false, user: action.payload }
        case USER_DETAILS_FAIL:
            // devolvemos una error (e) en la carga de datos (action.payload), si falla, una vez finalizada la carga (loading=false)
            return { loading: false, e: action.payload }
            // Si por algún motivo el reducer falla y no entra en ninguno de los tres CASE devolvemos el estado inicial del objeto
        case USER_DETAILS_RESET:
            return {user: {}}
        default:
            return state
    }
}

export const userUpdateProfileReducer = (state = { }, action) => {
    switch (action.type) {
        case USER_UPDATE_PROFILE_REQUEST:
            return { loading: true }

        case USER_UPDATE_PROFILE_SUCCESS:
            return { loading: false, success: true, userInfo: action.payload }

        case USER_UPDATE_PROFILE_FAIL:
            return { loading: false, error: action.payload }

        case USER_UPDATE_PROFILE_RESET:
            return {}

        default:
            return state
    }
}