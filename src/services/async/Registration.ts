import { request } from "../../utils/Api";
import { getRegisterUserAction  } from "../actions/User";
import { BASE_URL } from "../../utils/Api";
import { AppDispatch , AppThunk, TUser} from "../../utils/types";
export const registration:  AppThunk = (email:string, password:string, name:string) => {
    return function (dispatch :AppDispatch) {
        request<TUser>(`${BASE_URL}/auth/register`, {
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
                if(data)
                dispatch(getRegisterUserAction(data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}