import { request } from "../../utils/Api";
import { getApiDataAction } from "../actions/actions";
import { BASE_URL } from "../../utils/Api";
export const getApiData = () => {
    return function (dispatch) {
        request(`${BASE_URL}/ingredients`)
            .then(data => {
                dispatch(getApiDataAction(data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}