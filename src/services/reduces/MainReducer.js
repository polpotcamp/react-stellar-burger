import { GET_APIDATA, CREATE_ODER, SWITCH_BUN, ADD_INGREDIENT, SWITCH_INGREDIENT_DETAILS, REMOVE_INGREDIENT, SORTED_INGREDIENTS } from "../actions/actions";

export const getApiDataAction = (payload) => ({ type: GET_APIDATA, payload })
export const createOrderAction = (payload) => ({ type: CREATE_ODER, payload })
export const switchBunAction = (payload) => ({ type: SWITCH_BUN, payload })
export const addIngredientAction = (payload) => ({ type: ADD_INGREDIENT, payload })
export const switchIngredientDetailsAction = (payload) => ({ type: SWITCH_INGREDIENT_DETAILS, payload })
export const removeIngredientAction = (payload) => ({ type: REMOVE_INGREDIENT, payload })
export const sortedIngredientsAction = (payload) => ({ type: SORTED_INGREDIENTS, payload })
const initialState = {
    apiData: [],
    order: '',
    bun: [],
    ingr: [],
    inigredientDetails: [],
};
export const MainReducer = (state = initialState, action) => {
    switch (action.type) {
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
            console.log( action.payload.hoverIndex)
            return { ...state, ingr: newArr }
        default: {
            return state
        }
    }
}
// state.ingr.filter(ingredient =>  ingredient._id !== action.payload)
