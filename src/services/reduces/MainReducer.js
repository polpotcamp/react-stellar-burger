import {
    GET_APIDATA, CREATE_ODER, SWITCH_BUN, ADD_INGREDIENT, SWITCH_INGREDIENT_DETAILS, REMOVE_INGREDIENT, SORTED_INGREDIENTS, REGISTER_USER,
    SIGN_IN_USER, LOG_OUT, AUTHORIZATION_USER, WS_CONNECTION_CLOSED, WS_CONNECTION_SUCCESS, WS_CONNECTION_ERROR, WS_GET_MESSAGE, WS_GET_MESSAGE_USER_ORDERS, WS_CONNECTION_START_USER_ORDERS
} from "../actions/actions";

const initialState = {
    apiData: [],
    order: '',
    bun: [],
    ingr: [],
    inigredientDetails: [],
    isAuthorization: false,
    userName: '',
    userEmail: '',
    wsConnected: false,
    wsOrders: [],
    wsTotal: 0,
    wsTotalToday: 0,
    wsOrdesByUser: [],
}
export const MainReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_USER:
            localStorage.setItem("refreshToken", JSON.stringify(action.payload.refreshToken))
            localStorage.setItem("accessToken", JSON.stringify(action.payload.accessToken))
            return { ...state, isAuthorization: true , userName: action.payload.user.name, userEmail: action.payload.user.email}
        case SIGN_IN_USER:
            localStorage.setItem("refreshToken", JSON.stringify(action.payload.refreshToken))
            localStorage.setItem("accessToken", JSON.stringify(action.payload.accessToken))
            return { ...state, isAuthorization: true, userName: action.payload.user.name, userEmail: action.payload.user.email }
        case AUTHORIZATION_USER:
            return { ...state, isAuthorization: true, userName: action.payload.user.name, userEmail: action.payload.user.email }
        case LOG_OUT:
            localStorage.clear()
            return { ...state, isAuthorization: false }
        case GET_APIDATA:
            return { ...state, apiData: action.payload.data }
        case CREATE_ODER:
            return { ...state, order: action.payload.order.number }
        case SWITCH_BUN:
            return { ...state, bun: action.payload }
        case ADD_INGREDIENT:
            return { ...state, ingr: [...state.ingr, action.payload] }
        case SWITCH_INGREDIENT_DETAILS:
            return { ...state, inigredientDetails: action.payload }
        case REMOVE_INGREDIENT:
            return { ...state, ingr: state.ingr.filter(ingredient => ingredient.codeName !== action.payload.codeName) }
        case SORTED_INGREDIENTS:
            const dragCard = state.ingr[action.payload.dragIndex]
            const newArr = [...state.ingr]
            newArr.splice(action.payload.dragIndex, 1)
            newArr.splice(action.payload.hoverIndex, 0, dragCard)
            return { ...state, ingr: newArr }
        case WS_CONNECTION_SUCCESS:
            return {
                ...state,
                wsConnected: true
            };
        case WS_CONNECTION_ERROR:
            return {
                ...state,
                wsConnected: false
            };
        case WS_CONNECTION_CLOSED:
            return {
                ...state,
                wsConnected: false
            };
        case WS_GET_MESSAGE:
            return {
                ...state, wsOrders: action.payload.orders, wsTotal: action.payload.total, wsTotalToday: action.payload.totalToday
            }
        case WS_CONNECTION_START_USER_ORDERS:
            return {
                ...state,
                wsConnected: true
            };
        case WS_GET_MESSAGE_USER_ORDERS:
            return {
                ...state, wsOrdesByUser: action.payload.orders
            }
        default: {
            return state
        }
    }
}

