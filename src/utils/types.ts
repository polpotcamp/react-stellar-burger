import PropTypes from 'prop-types';
import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { store } from '..';
import { TIngredientActions } from '../services/actions/Ingredients';
export const ingredientType = PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    calories: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired
})
export type  TIngredient ={
    readonly calories: number;
    readonly carbohydrates: number;
    readonly fat: number;
    readonly image: string;
    readonly image_large: string;
    readonly image_mobile: string;
    readonly name: string;
    readonly price: number;
    readonly proteins: number;
    readonly type: string;
    readonly __v: number;
    readonly _id: string;
    codeName: number;
}
export type  TUser ={
    readonly success : boolean
    readonly user:{
        readonly email: string
        readonly name: string
    }
    readonly accessToken: string;
    readonly refreshToken: string;

}
export type TOrders ={
    orders: Array<TOrder>
    total: number
    totalToday: number
}
export type TOrder ={
    readonly createdAt: String;
    readonly ingredients: Array<string>;
    readonly name: String;
    readonly number: number;
    readonly status: String;
    readonly updatedAt: String;
    readonly _id: string;
}
export type TInitialState ={
    apiData: ReadonlyArray< TIngredient>;
    order: String;
    bun?: TIngredient;
    ingr: Array<any>;
    isAuthorization: Boolean;
    isAuthChecked: Boolean;
    userName: string;
    userEmail:string;
    wsConnected: Boolean;
    wsOrders:Array<TOrder>;
    wsTotal: number;
    wsTotalToday: number;
}
type TApplicationActions = TIngredientActions
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TApplicationActions>>