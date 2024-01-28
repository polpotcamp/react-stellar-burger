import { WS_CONNECTION_SUCCESS, WS_CONNECTION_ERROR, WS_CONNECTION_CLOSED, WS_GET_MESSAGE, WS_CONNECTION_START } from '../constants'
import { TOrders } from '../../utils/types';
export interface IGetWsConnectionStartAction {
    readonly type: typeof WS_CONNECTION_START;
    payload: string
}
export interface IGetWsConnectionSuccessAction {
    readonly type: typeof WS_CONNECTION_SUCCESS;
}
export interface IGetWsConnectionErrorAction {
    readonly type: typeof WS_CONNECTION_ERROR;
}
export interface IGetWsConnectionClosedAction {
    readonly type: typeof WS_CONNECTION_CLOSED;
}
export interface IGetWsGetMessageAction {
    readonly type: typeof WS_GET_MESSAGE;
    wsOrders: TOrders
}
export type TWsActions =
    | IGetWsConnectionSuccessAction
    | IGetWsConnectionErrorAction
    | IGetWsConnectionClosedAction
    | IGetWsGetMessageAction
export const getWsConnectionStartAction = (payload: string): IGetWsConnectionStartAction => ({
    type: WS_CONNECTION_START,
    payload
})
export const getWsConnectionSuccessAction = (): IGetWsConnectionSuccessAction => ({
    type: WS_CONNECTION_SUCCESS,
})
export const getWsConnectionErrorAction = (): IGetWsConnectionErrorAction => ({
    type: WS_CONNECTION_ERROR,
})
export const getWsConnectionClosedAction = (): IGetWsConnectionClosedAction => ({
    type: WS_CONNECTION_CLOSED,
})
export const getWsGetMessageAction = (wsOrders: TOrders): IGetWsGetMessageAction => ({
    type: WS_GET_MESSAGE,
    wsOrders
})