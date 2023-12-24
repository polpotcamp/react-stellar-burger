import { fetchWithRefresh } from "./FetchWithRefresh"
import { BASE_URL } from "../../utils/Api"
import { authorizationUserAction } from "../actions/actions" 
import { authCheckedAction } from "../actions/actions"
function getUserData(){
    return function (dispatch){
    fetchWithRefresh(`${BASE_URL}/auth/user`, {
        method: 'GET',
        headers: {
          authorization: JSON.parse(localStorage.getItem("accessToken"))
        }
      }).then((data) => {
        dispatch(authorizationUserAction(data))
      }).catch(error => {
        console.log(error)
    })
    .finally(dispatch(authCheckedAction()))
}
}
export default getUserData