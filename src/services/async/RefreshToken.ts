
import { BASE_URL } from "../../utils/Api";
import { request } from "../../utils/Api";
import { TUser } from "../../utils/types";
export const refreshToken  = async ():Promise<TUser|null> => {
  return request(`${BASE_URL}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  })
};
