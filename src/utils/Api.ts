
export function checkReponse(res:any){
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
}
export  function request(url:string,options?:any){
    return fetch(url, options).then(checkReponse)
}
export const BASE_URL ='https://norma.nomoreparties.space/api'