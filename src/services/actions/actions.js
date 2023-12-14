export const GET_APIDATA = 'GET_APIDATA'
export const CREATE_ODER = 'CREATE_ODER'
export const SWITCH_BUN = "SWITCH_BUN"
export const ADD_INGREDIENT = 'ADD_INGREDIENT'
export const SWITCH_INGREDIENT_DETAILS = 'SWITCH_INGREDIENT_DETAILS'
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT'
export const SORTED_INGREDIENTS = 'SORTED_INGREDIENTS'
export const REGISTER_USER = 'REGISTER_USER'
export const SIGN_IN_USER = 'SIGN_IN_USER'
export const LOG_OUT = 'LOG_OUT'
export const AUTHORIZATION_USER = 'AUTHORIZATION_USER'
export const getApiDataAction = (payload) => ({ type: GET_APIDATA, payload })
export const createOrderAction = (payload) => ({ type: CREATE_ODER, payload })
export const switchBunAction = (payload) => ({ type: SWITCH_BUN, payload })
export const addIngredientAction = (payload) => ({ type: ADD_INGREDIENT, payload })
export const switchIngredientDetailsAction = (payload) => ({ type: SWITCH_INGREDIENT_DETAILS, payload })
export const removeIngredientAction = (payload) => ({ type: REMOVE_INGREDIENT, payload })
export const sortedIngredientsAction = (payload) => ({ type: SORTED_INGREDIENTS, payload })
export const registerUserAction = (payload) => ({ type: REGISTER_USER, payload })
export const signInUserAction = (payload) => ({ type: SIGN_IN_USER, payload })
export const logOutAction = (payload) => ({ type: LOG_OUT, payload })
export const authorizationUserAction = (payload) => ({ type:AUTHORIZATION_USER, payload })