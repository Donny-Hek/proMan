import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'http://localhost:8080/test/';

class ProjectsService {
    constructor() {
        this.user = JSON.parse(localStorage.getItem('user'));

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
    create(counter, nameProj) {
        let contentProj = JSON.stringify(this.content);
        if (nameProj == 'Новый проект' && counter > 0) {
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
        return axios.get(API_URL + id, { headers: authHeader() })
            .then(response => {
                localStorage.setItem(id, JSON.stringify(response.data));
            });
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

        const url = API_URL + id + '/edit';

        let project = JSON.parse(localStorage.getItem(id)); //вывод проекта
        this.content = JSON.parse(project.content); //парсинг строки в объект
        this.content[key].push(this.toDo);
        let newContent = JSON.stringify(this.content);

        return axios({
            method: 'post',
            url: url,
            data: newContent,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.user.token
            }
        }).then(response => {
            localStorage.setItem(id, JSON.stringify(response.data));
        });
    }
    // удаление задачи
    delToDo(id, key, section) {
        const url = API_URL + id + '/edit';
        let project = JSON.parse(localStorage.getItem(id)); //вывод проекта
        this.content = JSON.parse(project.content); //парсинг строки в объект
        
        switch (section) {
            case "To Do":
                this.content[section].splice(key, 1);
                break;
            case "In progress":
                this.content[section].splice(key, 1);
                break;
            case "Completed":
                this.content[section].splice(key, 1);
                break;
            default:
                alert("Произошла ошибка");
                return;
        }
        let newContent = JSON.stringify(this.content);
        return axios({
            method: 'post',
            url: url,
            data: newContent,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.user.token
            }
        }).then(response => {
            localStorage.setItem(id, JSON.stringify(response.data));
        });
    }
    // изменение содержания
    editColumn(id, key, section) { //нынешний столбец -- section
        const url = API_URL + id + '/edit';
        let project = JSON.parse(localStorage.getItem(id)); //вывод проекта
        this.content = JSON.parse(project.content); //парсинг содержания проекта в объекты

        this.toDo = this.content[section][key]; //записываю меняющую секцию задачу в переменную
        switch (section) {
            case "To Do":
                this.content[section].splice(key, 1); //удаляю задачу из нынешней секции
                this.toDo.section = "In progress";
                this.content["In progress"].push(this.toDo); //добавляю задачу в конец следующей секции
                break;
            case "In progress":
                this.content[section].splice(key, 1); //удаляю задачу из нынешней секции
                this.toDo.section = "Completed";
                this.content["Completed"].push(this.toDo);
                break;
            default:
                alert("Упс! Эту задачу можно только удалить:)");
                return;
        }
        let newContent = JSON.stringify(this.content);
        return axios({
            method: 'post',
            url: url,
            data: newContent,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.user.token
            }
        }).then(response => {
            localStorage.setItem(id, JSON.stringify(response.data));
        });
    }
}

export default new ProjectsService();