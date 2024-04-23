import $api from "../http";

export default class ScheduleService{
    static async getSchedule(id){
        return $api.get(`course/schedule/?course_id=${id}`)
    }
    static async createSchedule(data){
        return $api.post(`course/schedule/`, data)
    }
    static async changeSchedule(id, data){
        return $api.patch(`course/schedule/${id}/`, data)
    }
    static async deleteSchedule(id){
        return $api.delete(`course/schedule/${id}`)
    }
}