import { request } from "../../components/utils/utils";
import { getApiDataAction } from "../reduces/MainReducer";
export const getApiData = () => {
    return function (dispatch) {
        request(`https://norma.nomoreparties.space/api/ingredients`)
            .then(data => {
                dispatch(getApiDataAction(data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}