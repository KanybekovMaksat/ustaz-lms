import $api from "../http";

export default class LessonService{
    static async getLessons(id){
        return $api.get(`course/content/?module_id=${id}`)
    }
    static async getLesson(id){
        return $api.get(`course/content/${id}/`)
    }
    static async createLesson({title, content_html, module}){
        return $api.post("course/content/", {title, content_html, module})
    }
    static async updateLesson(id, data) {
        return $api.patch(`course/content/${id}/`, data);
    }
    static async deleteLesson(id){
        return $api.delete(`course/content/${id}`)
    }
    static async imageUpload(img){
        return $api.post("/image", {img})
    }
}