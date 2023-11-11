import { GET_APIDATA, CREATE_ODER, SWITCH_BUN, ADD_INGREDIENT, SWITCH_INGREDIENT_DETAILS, REMOVE_INGREDIENT, SORTED_INGREDIENTS } from "../actions/actions";

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
