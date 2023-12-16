
import { request } from "../../utils/Api"
import { BASE_URL } from "../../utils/Api"
function resetPassword(){
    return function (password,token){
        request(`${BASE_URL}/password-reset/reset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                "password": password,
                "token": token
            })
        }).then(() => {
            localStorage.setItem("flag", JSON.stringify(null))
        })
        .catch(error => {
            console.log(error)
        })
}
}
export default resetPassword