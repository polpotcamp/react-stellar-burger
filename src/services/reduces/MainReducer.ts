import {
    APIDATA_REQUEST, CREATE_ODER, SWITCH_BUN, ADD_INGREDIENT,  REMOVE_INGREDIENT, SORTED_INGREDIENTS, REGISTER_USER,
    SIGN_IN_USER, LOG_OUT, AUTHORIZATION_USER, WS_CONNECTION_CLOSED, WS_CONNECTION_SUCCESS, WS_CONNECTION_ERROR, WS_GET_MESSAGE, AUTH_CHECKED
} from "../constants";
import { TInitialState } from "../../utils/types";
import { TIngredientActions } from "../actions/Ingredients";
import { TUserActions } from "../actions/User";
import { TWsActions } from "../actions/WS";
const initialState: TInitialState = {
    apiData: [],
    order: '',
    bun: undefined,
    ingr: [],
    isAuthorization: false,
    isAuthChecked: false,
    userName: '',
    userEmail: '',
    wsConnected: false,
    wsOrders: [],
    wsTotal: 0,
    wsTotalToday: 0,
}
type MainAction = TIngredientActions | TUserActions|TWsActions
export const MainReducer = (state = initialState, action:MainAction) :TInitialState=> {
    switch (action.type) {
        case REGISTER_USER:
            localStorage.setItem("refreshToken", JSON.stringify(action.user.refreshToken))
            localStorage.setItem("accessToken", JSON.stringify(action.user.accessToken))
            return { ...state, isAuthorization: true, userName: action.user.user.name, userEmail: action.user.user.email, isAuthChecked: true }
        case SIGN_IN_USER:
            localStorage.setItem("refreshToken", JSON.stringify(action.user.refreshToken))
            localStorage.setItem("accessToken", JSON.stringify(action.user.accessToken))
            return { ...state, isAuthorization: true, userName: action.user.user.name, userEmail: action.user.user.email, isAuthChecked: true }
        case AUTHORIZATION_USER:
            return { ...state, isAuthorization: true, userName: action.user.user.name, userEmail: action.user.user.email, isAuthChecked: true }
        case LOG_OUT:
            localStorage.clear()
            return { ...state, isAuthorization: false }
        case APIDATA_REQUEST:
            return { ...state, apiData: action.apiData, isAuthChecked: true }
        case CREATE_ODER:
            return { ...state, order: action.order }
        case SWITCH_BUN:
            return { ...state, bun: action.bun }
        case ADD_INGREDIENT:
            return { ...state, ingr: [...state.ingr, action.ingr] }
        case REMOVE_INGREDIENT:
            console.log(action.element)
            return { ...state , ingr: state.ingr.filter(ingredient => ingredient.codeName !== action.element.codeName) }
        case SORTED_INGREDIENTS:
            const dragCard = state.ingr[action.dragIndex]
            const newArr = [...state.ingr]
            newArr.splice(action.dragIndex, 1)
            newArr.splice(action.hoverIndex, 0, dragCard)
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
        case AUTH_CHECKED:
            return {
                ...state, isAuthChecked: true
            }
        default: {
            return state
        }
    }
}

