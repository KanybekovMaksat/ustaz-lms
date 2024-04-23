import $api from "../http";

export default class ModuleService{
    static async getModule(id){
        return $api.get(`course/module/?course_id=${id}`)
    }
    static async createModule({ title, description, course}){
        return $api.post("course/module/", {title, description, course})
    }
    static async updateModule(id, data) {
        return $api.patch(`course/module/${id}/`, data)
    }
    static async deleteModule(id){
        return $api.delete(`course/module/${id}`)
    }
}