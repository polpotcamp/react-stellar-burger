import { refreshToken } from "./RefreshToken";
import { checkReponse } from "../../utils/Api";
  export const fetchWithRefresh = async (url:string, options:any) => {
    try {
      const res = await fetch(url, options);
      return await checkReponse(res);
    } catch (err:any) {
      if (err.message === "jwt expired") {
        const refreshData = await refreshToken(); //обновляем токен
        if (!refreshData.success) {
          return Promise.reject(refreshData);
        }
        localStorage.setItem("refreshToken", refreshData.refreshToken);
        localStorage.setItem("accessToken", refreshData.accessToken);
        options.headers.authorization = refreshData.accessToken;
        const res = await fetch(url, options); //повторяем запрос
        return await checkReponse(res);
      } else {
        return Promise.reject(err);
      }
    }
  };