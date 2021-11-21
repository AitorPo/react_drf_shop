/* Flujo de datos de programación para Redux
1 -> Creamos las constantes para el modelo sobre el que queramos trabajar (/constants/)
2 -> Creamos el reducer correspondiente al modelo y definimos los datos que devolverá cada constante (/reducers/)
3 -> Registramos el reducer en store.js para poder utilizarlo (comprobamos que se ha registrado en la consola de Redux del navegador)
4 -> Creamos las acciones que desencadenará el reducer (/actions/)
5 -> 
*/

export const ORDER_CREATE_REQUEST = 'ORDER_CREATE_REQUEST'
export const ORDER_CREATE_SUCCESS = 'ORDER_CREATE_SUCCESS'
export const ORDER_CREATE_FAIL = 'ORDER_CREATE_FAIL'
export const ORDER_CREATE_RESET = 'ORDER_CREATE_RESET'

export const ORDER_DETAILS_REQUEST = 'ORDER_DETAILS_REQUEST'
export const ORDER_DETAILS_SUCCESS = 'ORDER_DETAILS_SUCCESS'
export const ORDER_DETAILS_FAIL = 'ORDER_DETAILS_FAIL'

export const ORDER_PAY_REQUEST = 'ORDER_PAY_REQUEST'
export const ORDER_PAY_SUCCESS = 'ORDER_PAY_SUCCESS'
export const ORDER_PAY_FAIL = 'ORDER_PAY_FAIL'
export const ORDER_PAY_RESET = 'ORDER_PAY_RESET'