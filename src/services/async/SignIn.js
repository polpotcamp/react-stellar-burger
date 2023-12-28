import { request } from "../../utils/Api";
import { signInUserAction } from "../actions/actions";
import { BASE_URL } from "../../utils/Api";
export const signUp= (email, password) => {
    return function (dispatch) {
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
                dispatch(signInUserAction(data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}