
import { BASE_URL } from "../../utils/Api";
import { checkReponse } from "../../utils/Api";
export const refreshToken = () => {
  return fetch(`${BASE_URL}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  }).then(checkReponse)
    .catch(error => {
      console.log(error)
    });
};