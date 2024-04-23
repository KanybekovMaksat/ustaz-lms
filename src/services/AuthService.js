import $api from "../http";
import axios from "axios";

export default class AuthService {
    static async login(email, password){
        return axios.post("http://localhost:8000/api/user/login/", {email, password})
    }
    static async logout(){
        return $api.post("user/logout/")
    }
}    