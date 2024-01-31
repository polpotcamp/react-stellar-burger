import { request } from "../../utils/Api";
import { getLogOutAction } from "../actions/User";
import { BASE_URL } from "../../utils/Api";
import { AppDispatch , AppThunk} from "../../utils/types";
export const logOut: AppThunk = () => {
    return function (dispatch: AppDispatch) {
        request(`${BASE_URL}/auth/logout`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                "token": JSON.parse(localStorage.getItem("refreshToken")as string)
            })
        })
            .then(() => {
                dispatch(getLogOutAction())
            })
            .catch(error => {
                console.log(error)
            })
    }
}