import { request } from "../../utils/Api";
import { createOrderAction } from "../actions/actions";
import { BASE_URL } from "../../utils/Api";
export const fetchOrder = (ids) => {
    return function (dispatch) {
        request(`${BASE_URL}/orders`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                Authorization: JSON.parse(localStorage.getItem("accessToken"))
            },
            body: JSON.stringify({
                "ingredients": ids
            })
        })
            .then(data => {
                console.log(data)
                dispatch(createOrderAction(data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}