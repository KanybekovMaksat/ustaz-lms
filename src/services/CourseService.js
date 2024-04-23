import $api from "../http";


export default class CourseService {
    static async getCourse(id){
        return $api.get(`course/${id}/`)
    }
}