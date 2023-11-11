import { request } from "../../components/utils/utils";
import { createOrderAction } from "../reduces/MainReducer";
export const fetchOrder = (ids) => {
    return function (dispatch) {
        request(`https://norma.nomoreparties.space/api/orders`,{
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