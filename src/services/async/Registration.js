import { request } from "../../utils/Api";
import { registerUserAction } from "../actions/actions";
import { BASE_URL } from "../../utils/Api";
export const registration = (email, password, name) => {
    return function (dispatch) {
        request(`${BASE_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                "email": email,
                "password": password,
                "name": name
            })
        })
            .then(data => {
                console.log(data)
                dispatch(registerUserAction(data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}