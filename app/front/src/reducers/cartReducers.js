import {
    ADD_ITEM,
    REMOVE_ITEM,
    CART_SAVE_SHIPPING_INFO,
    CART_SAVE_PAYMENT_METHOD,
    CART_CLEAR_ITEMS,
} from '../constants/cartConstants'


export const cartReducer = (state = { cartItems: [], shippingInfo: {} }, action) => {
    switch (action.type) {
        case ADD_ITEM:
            const item = action.payload
            const existItem = state.cartItems.find(x => x.product === item.product)

            if (existItem) {
                return {
                    ...state,
                    // buscamos la coincidencia en el carrito
                    cartItems: state.cartItems.map(x =>
                        // si el producto ya está en el carrito lo actualizamos porque su cantidad habrá aumentado (? item)
                        // en caso contrario devolvemos el producto recientemente añadido (: x)
                        x.product === existItem.product ? item : x
                    )
                }
            } else {
                return {
                    // devolvemos el estado actual actualizado (Rest operator)
                    ...state,
                    // devolvemos el array original (...state.cartItems) añadiéndole el nuevo producto (item)
                    cartItems: [...state.cartItems, item]
                }
            }

        case REMOVE_ITEM:
            return {
                ...state,
                // action.payload es el id del producto que queremos eliminar
                // filter mantiene todos los productos cuyo id NO COINCIDA con el que le pasemos como para (action.payload)
                cartItems: state.cartItems.filter(x => x.product !== action.payload)
            }

        case CART_SAVE_SHIPPING_INFO:
            return {
                ...state,
                shippingInfo: action.payload
            }

        case CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload
            }

        case CART_CLEAR_ITEMS:
            return {
                ...state,
                cartItems: []
            }

        default:

            return state
    }
}