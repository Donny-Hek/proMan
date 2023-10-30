import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'http://localhost:8080/test/';

class ProjectsService {
    constructor() {
        this.name = "Новый проект";
        this.content = {
            "To Do": [],
            "In progress": [],
            "Completed": []
        };
        this.toDo = {
            "title": null,
            "subtitle": null,
            "section": null
        }
    }
    // вывод всех в бар
    getAll() {
        return axios.get(API_URL + 'user', { headers: authHeader() });
    }
    // добавление проекта
    create(counter) {
        let nameProj = this.name;
        let contentProj = JSON.stringify(this.content);
        if (counter != 0) {
            nameProj = this.name + " " + counter;
        }
        return axios
            .post(API_URL + 'add', { name: nameProj, content: contentProj }, { headers: authHeader() });
    }
    // удаление проекта
    delete(id) {
        // localStorage.removeItem(id);
        const url = API_URL + 'del/' + id;
        return axios.get(url, { headers: authHeader() });
    }
    getProject(id) {
        return axios.get(API_URL + id, { headers: authHeader() })
            .then(response => {
                localStorage.setItem(id, JSON.stringify(response.data));
            });
    }
    getObjProject(id) {
        return JSON.parse(localStorage.getItem(id));
    }
    addToDo(name, cont, key) {
        // let todo = this.toDo;
        this.toDo.title = name;
        this.toDo.subtitle = cont;
        this.toDo.section = key;
        // alert(this.toDo.title+" "+this.toDo.section);
        return this.toDo;
    }
    // изменение названия
    // изменение содержания

}

export default new ProjectsService();