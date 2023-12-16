import {
    GET_APIDATA, CREATE_ODER, SWITCH_BUN, ADD_INGREDIENT, SWITCH_INGREDIENT_DETAILS, REMOVE_INGREDIENT, SORTED_INGREDIENTS, REGISTER_USER,
    SIGN_IN_USER, LOG_OUT, AUTHORIZATION_USER
} from "../actions/actions";

const initialState = {
    apiData: [],
    order: '',
    bun: [],
    ingr: [],
    inigredientDetails: [],
    isAuthorization: false,
    userName:'',
    userEmail:''
}
export const MainReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_USER:
            localStorage.setItem("refreshToken", JSON.stringify(action.payload.refreshToken))
            localStorage.setItem("accessToken", JSON.stringify(action.payload.accessToken))
            return { ...state,  isAuthorization: true}
        case SIGN_IN_USER:
            localStorage.setItem("refreshToken", JSON.stringify(action.payload.refreshToken))
            localStorage.setItem("accessToken", JSON.stringify(action.payload.accessToken))
            return { ...state,  isAuthorization: true}
        case AUTHORIZATION_USER:
            return { ...state,  isAuthorization: true, userName: action.payload.user.name ,userEmail:action.payload.user.email }
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
        default: {
            return state
        }
    }
}

