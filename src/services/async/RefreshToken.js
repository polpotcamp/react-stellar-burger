
import { BASE_URL } from "../../utils/Api";
    const checkReponse = (res) => {
        return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
      };
export const refreshToken = () => {
    return fetch(`${BASE_URL}/auth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        token: localStorage.getItem("refreshToken"),
      }),
    }).then(checkReponse);
  };