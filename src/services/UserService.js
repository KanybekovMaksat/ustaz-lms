import $api from "../http";


export default class UserService {
    static async getUser(id){
        return $api.get(`user/${id}`)
    }
}