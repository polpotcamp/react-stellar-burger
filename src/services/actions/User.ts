import { REGISTER_USER, SIGN_IN_USER, LOG_OUT, AUTHORIZATION_USER, AUTH_CHECKED } from '../constants'
import { TUser } from '../../utils/types';
export interface IGetRegisterUserAction {
    readonly type: typeof REGISTER_USER;
    user: TUser;
}
export interface IGetSignInUserAction {
    readonly type: typeof SIGN_IN_USER;
    user: TUser;
}
export interface IGetLogOutAction {
    readonly type: typeof LOG_OUT;
}
export interface IGetAuthorizationUserAction {
    readonly type: typeof AUTHORIZATION_USER;
    user: TUser;
}
export interface IGetAuthCheckedAction {
    readonly type: typeof AUTH_CHECKED;
}
export type TUserActions =
    | IGetRegisterUserAction
    | IGetSignInUserAction
    | IGetLogOutAction
    | IGetAuthorizationUserAction
    | IGetAuthCheckedAction

export const getRegisterUserAction = (user: TUser): IGetRegisterUserAction => ({
    type: REGISTER_USER,
    user
})
export const getSignInUserAction = (user: TUser): IGetSignInUserAction => ({
    type: SIGN_IN_USER,
    user
})
export const getLogOutAction = (): IGetLogOutAction => ({
    type: LOG_OUT,
})
export const getAuthorizationUserAction = (user: TUser): IGetAuthorizationUserAction => ({
    type: AUTHORIZATION_USER,
    user
})
export const getAuthCheckedAction = (): IGetAuthCheckedAction => ({
    type: AUTH_CHECKED,
})