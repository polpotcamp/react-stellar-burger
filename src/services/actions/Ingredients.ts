import { APIDATA_REQUEST, CREATE_ODER, SWITCH_BUN, ADD_INGREDIENT, SWITCH_INGREDIENT_DETAILS, REMOVE_INGREDIENT, SORTED_INGREDIENTS } from '../constants'
import { TIngredient } from '../../utils/types';
export interface IGetApiDataAction {
  readonly type: typeof APIDATA_REQUEST;
  apiData: ReadonlyArray<TIngredient>;
}
export interface IGetCreatedOrderAction {
  readonly type: typeof CREATE_ODER;
  order: number
}
export interface IGetSwitchBunAction {
  readonly type: typeof SWITCH_BUN;
  bun: TIngredient
}
export interface IGetAddIngredientAction {
  readonly type: typeof ADD_INGREDIENT;
  ingr: Array<TIngredient>
}

export interface IGetRemoveIngredientAction {
  readonly type: typeof REMOVE_INGREDIENT;
  element: TIngredient
}
export interface IGetSortedIngredients {
  readonly type: typeof SORTED_INGREDIENTS;
  dragIndex: number,
  hoverIndex: number
}
export type TIngredientActions =
  | IGetApiDataAction
  | IGetCreatedOrderAction
  | IGetSwitchBunAction
  | IGetAddIngredientAction
  | IGetRemoveIngredientAction
  | IGetSortedIngredients

export const getApiDataAction = (apiData: ReadonlyArray<TIngredient>): IGetApiDataAction => ({
  type: APIDATA_REQUEST,
  apiData
})
export const getCreateOrderAction = (order: number): IGetCreatedOrderAction => ({
  type: CREATE_ODER,
  order
})
export const getSwitchBunAction = (bun: TIngredient): IGetSwitchBunAction => ({
  type: SWITCH_BUN,
  bun
})
export const getAddIngredientAction = (ingr: Array<TIngredient>): IGetAddIngredientAction => ({
  type: ADD_INGREDIENT,
  ingr
})
export const getRemoveIngredientAction = (element:  TIngredient): IGetRemoveIngredientAction => ({
  type: REMOVE_INGREDIENT,
  element
})
export const getSortedIngredientsAction = (dragIndex: number, hoverIndex: number): IGetSortedIngredients => ({
  type: SORTED_INGREDIENTS,
  dragIndex,
  hoverIndex
})