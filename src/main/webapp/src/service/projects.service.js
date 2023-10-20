import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'http://localhost:8080/test/';

class ProjectsService {
    create(nameproject) {
        nameproject="Новый проект";
        return axios
            .post(API_URL + 'add', { headers: authHeader(), nameproject })
            .then(response => {
                if (response.data){
                    localStorage.setItem("projects")
                }
            });
    }
    // getProjectService() {
    //     <div> projects.service</div >
    // }
}

export default new ProjectsService();