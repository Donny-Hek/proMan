import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'http://localhost:8080/test/';

class ProjectsService {
    constructor() {
        this.name = "Новый проект";
    }
    create(counter) {//counter
        let nameProj = this.name
        if (counter != 0) {
            nameProj = this.name + " " + counter;
        }
        return axios
            .post(API_URL + 'add', { name: nameProj }, { headers: authHeader() });
    }
}

export default new ProjectsService();