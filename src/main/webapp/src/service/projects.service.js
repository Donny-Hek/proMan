import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'http://localhost:8080/test/';

class ProjectsService {
    constructor() {
        this.user = JSON.parse(localStorage.getItem('user'));
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.user.token;

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
        };
    }
    // вывод списка ссылок на проекты
    getAll() {
        return axios.get(API_URL + 'user', { headers: authHeader() });
    }
    // добавление проекта
    create(counter) {
        let nameProj = prompt('Введите название:', ['Новый проект']);
        // let nameProj = this.name;
        let contentProj = JSON.stringify(this.content);
        if (nameProj == 'Новый проект') {
            nameProj = nameProj + " " + counter;
        }
        return axios
            .post(API_URL + 'add', { name: nameProj, content: contentProj }, { headers: authHeader() });
    }
    // удаление проекта
    delete(id) {
        localStorage.removeItem(id);
        const url = API_URL + id + '/del';
        return axios.get(url, { headers: authHeader() });
    }
    // запись проекта в память
    getProject(id) {
        // if (localStorage.getItem(id) == 0) {
        return axios.get(API_URL + id, { headers: authHeader() })
            .then(response => {
                localStorage.setItem(id, JSON.stringify(response.data));
            });
        // } else return localStorage.getItem(id);
    }
    // вывод проекта из памяти по id
    getObjProject(id) {
        return JSON.parse(localStorage.getItem(id));
    }
    // добавление задачи
    addToDo(name, cont, key, id) {
        this.toDo.title = name;
        this.toDo.subtitle = cont;
        this.toDo.section = key;

        const url = API_URL + id + '/addTask';

        let project = JSON.parse(localStorage.getItem(id)); //вывод проекта
        this.content = JSON.parse(project.content); //парсинг строки в объект
        this.content[key].push(this.toDo);
        let newContent = JSON.stringify(this.content);

        // axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.user.token;
        return axios({
            method: 'post',
            url: url,
            data: newContent,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.user.token
            }

        });
        // return axios.post(url, { newContent }, { headers: authHeader() });
    }
    // изменение названия
    // изменение содержания

}

export default new ProjectsService();