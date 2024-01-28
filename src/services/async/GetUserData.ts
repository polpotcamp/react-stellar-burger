import { fetchWithRefresh } from "./FetchWithRefresh"
import { BASE_URL } from "../../utils/Api"
import { getAuthorizationUserAction } from "../actions/User"
import { getAuthCheckedAction } from "../actions/User"
import { AppDispatch, AppThunk } from "../../utils/types";
export const getUserData: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    fetchWithRefresh(`${BASE_URL}/auth/user`, {
      method: 'GET',
      headers: {
        authorization: JSON.parse(localStorage.getItem("accessToken")as string)
      }
    }).then((data) => {
      dispatch(getAuthorizationUserAction(data))
    }).catch(error => {
      console.log(error)
    })
      .finally(()=>dispatch(getAuthCheckedAction()))
  }
}
export default getUserData