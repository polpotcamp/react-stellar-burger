import { request } from "../../utils/Api";
import { logOutAction } from "../actions/actions";
import { BASE_URL } from "../../utils/Api";
export const logOut = () => {
    const token = JSON.parse(localStorage.getItem("refreshToken"));
    return function (dispatch) {
        request(`${BASE_URL}/auth/logout`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                "token": token
            })
        })
            .then(() => {
                console.log(token)
                dispatch(logOutAction())
            })
            .catch(error => {
                console.log(error)
            })
    }
}