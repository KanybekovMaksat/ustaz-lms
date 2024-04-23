import $api from "../http";

export default class ProjectService{
    static async createProject(data){
        return $api.post("user/project-student/", data);
    }
    static async getAllProjects(){
        return $api.get();
    }
    static async changeProject(){
        return $api.patch();
    }
    static async deleteProject(){
        return $api.delete();
    }
}