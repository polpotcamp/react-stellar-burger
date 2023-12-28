import { fetchWithRefresh } from "./FetchWithRefresh"
import { BASE_URL } from "../../utils/Api"
function changeProfileData(name, email) {
    return function (){ fetchWithRefresh(`${BASE_URL}/auth/user`, {
        method: 'PATCH',
        headers: {
            authorization: JSON.parse(localStorage.getItem("accessToken")),
            'Content-Type': 'application/json'
        }, body: JSON.stringify({
            'name': name,
            'email': email
        })
    }).catch(error => {
        console.log(error)
    })
}
}
export default changeProfileData