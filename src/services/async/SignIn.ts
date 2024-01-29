import { request } from "../../utils/Api";
import { getSignInUserAction } from "../actions/User";
import { BASE_URL } from "../../utils/Api";
import { AppDispatch, AppThunk } from "../../utils/types";
export const signUp: AppThunk = (email: string, password: string) => {
    return function (dispatch: AppDispatch) {
        request(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                "email": email,
                "password": password,
            })
        })
            .then(data => {
                dispatch(getSignInUserAction(data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}