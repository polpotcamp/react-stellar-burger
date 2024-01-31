import { request } from "../../utils/Api";
import { getCreateOrderAction } from "../actions/Ingredients";
import { BASE_URL } from "../../utils/Api";
import { AppDispatch, AppThunk, TOrder } from "../../utils/types";
export const fetchOrder: AppThunk = (ids) => {
    return function (dispatch: AppDispatch) {
        request<{ name: String, order: TOrder, success: boolean }>(`${BASE_URL}/orders`, {
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
                if (data)
                    dispatch(getCreateOrderAction(data.order.number))
            })
            .catch(error => {
                console.log(error)
            })
    }
}