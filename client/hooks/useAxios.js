import axios from "axios";

export function useAxios(){
    const instance = axios.create()
    const token = typeof(window) === "object" && localStorage.getItem("token")
    instance.interceptors.request.use(function(config){
        // return getSessionToken(app).then((token) => {
            config.headers["Authorization"] = `Bearer ${token}`
            return config
        // })
    })
    return [instance]
}