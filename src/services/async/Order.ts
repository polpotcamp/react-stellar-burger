import { request } from "../../utils/Api";
import { getCreateOrderAction } from "../actions/Ingredients";
import { BASE_URL } from "../../utils/Api";
import { AppDispatch , AppThunk} from "../../utils/types";
export const fetchOrder : AppThunk  = (ids) => {
    return function (dispatch:AppDispatch) {
        request(`${BASE_URL}/orders`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                Authorization: JSON.parse(localStorage.getItem("accessToken") as string)
            },
            body: JSON.stringify({
                "ingredients": ids
            })
        })
            .then(data => {
                console.log(data)
                dispatch(getCreateOrderAction(data.order.number))
            })
            .catch(error => {
                console.log(error)
            })
    }
}