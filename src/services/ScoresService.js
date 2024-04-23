import  $api from "../http"

export default class ScoresService{
    static async getScores(id){
        return $api.get(`course/grade/?course_id=${id}`)
    }
}