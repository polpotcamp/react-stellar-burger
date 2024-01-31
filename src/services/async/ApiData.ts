import { request } from "../../utils/Api";
import { getApiDataAction } from "../actions/Ingredients";
import { BASE_URL } from "../../utils/Api";
import { AppDispatch, AppThunk } from "../../utils/types";
import { TIngredient } from "../../utils/types";
export const getApiData: AppThunk = () => {
    return function (dispatch: AppDispatch) {
        request<{ data: Array<TIngredient> }>(`${BASE_URL}/ingredients`)
            .then(data => {
                if (data)
                    dispatch(getApiDataAction(data.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}