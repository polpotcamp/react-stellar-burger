import { refreshToken } from "./RefreshToken";
import { checkReponse } from "../../utils/Api";
import { TUser } from "../../utils/types";
export const fetchWithRefresh = async (url: string, options: RequestInit) => {
  try {
    const res = await fetch(url, options);
    return await checkReponse(res) as TUser;
  } catch (err: any) {
    if (err=== "Ошибка 403") {
      const refreshData = await refreshToken(); //обновляем токен
      if (refreshData) {
        if (!refreshData.success) {
          return Promise.reject(refreshData);
        }
        localStorage.setItem("refreshToken", refreshData.refreshToken);
        localStorage.setItem("accessToken", refreshData.accessToken);
        if (options.headers) {
          (options.headers as Headers).set('authorization', refreshData.accessToken);
          const res = await fetch(url, options); //повторяем запрос
          return await checkReponse(res) as TUser;
        }
      }
    } else {
      return Promise.reject(err);
    }
  }
};