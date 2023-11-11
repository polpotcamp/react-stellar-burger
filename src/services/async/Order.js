import { request } from "../../components/utils/Api";
import { createOrderAction } from "../actions/actions";
import { BASE_URL } from "../../components/utils/Api";
export const fetchOrder = (ids) => {
    return function (dispatch) {
        request(` ${BASE_URL}/orders`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                "ingredients": ids
            })
        })
            .then(data => {
                dispatch(createOrderAction(data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}