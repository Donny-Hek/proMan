import React, { Component } from "react";

import { withRouter } from "../common/with-router";
import projectsService from "../service/projects.service";

class BoardUser extends Component {
    constructor(props) {
        super(props);
        this.deleteProject = this.deleteProject.bind(this);
        this.state = {
            id: "",
            pName: "",
            content: {
                "To Do": [],
                "In progress": [],
                "Completed": []
            }
        };
    }

    async componentDidMount() {
        let url = window.location.href;
        url = url.substring(url.lastIndexOf('/'));
        url = url.replace("/", "");
        await projectsService.getProject(url);
        let projects = await projectsService.getObjProject(url);

        // let pro = JSON.parse(projects.content);
        // this.todo = pro['To Do'];
        // this.inprogres = pro['In progress'];
        // this.completed = pro['Completed'];

        this.setState({
            id: projects.id,
            pName: projects.name,
            content: JSON.parse(projects.content)
        });

    }

    async deleteProject(e) {
        e.preventDefault();
        await projectsService.delete(this.state.id)
            .then(() => {
                localStorage.removeItem(this.state.id);
                this.props.router.navigate("/home");
                window.location.reload()
            });
    }

    async addTask(section, e) {
        // e.preventDefault();
        let name = prompt('Введите название:', [section]);
        let det = prompt('Введите детали:', ['details']);
        if (name == null || det == null) window.location.reload();
        else await projectsService.addToDo(name, det, section, this.state.id)

        let projects = await projectsService.getObjProject(this.state.id);

        this.setState({
            content: JSON.parse(projects.content)
        });
        window.location.reload();
    }

    async deleteTask(key, section, e) {
        // e.preventDefault();
        await projectsService.delToDo(this.state.id, key, section);
        let projects = await projectsService.getObjProject(this.state.id);
        this.setState({
            content: JSON.parse(projects.content)
        });
        window.location.reload();
    }

    async editStage(key, section, e) { //нынешний столбец -- section
        await projectsService.editColumn(this.state.id, key, section);
        let projects = await projectsService.getObjProject(this.state.id);
        this.setState({
            content: JSON.parse(projects.content)
        });
        window.location.reload();
    }

    render() {
        let num;
        let sec;
        return (
            <div class="px-5 py-3 d-flex flex-nowrap flex-column vh-100" >
                <div class="d-flex">
                    <h4 class="col">
                        {this.state.pName}
                    </h4>
                    <button className="remove-buttons" class="col btn btn-outline-danger px-3"
                        onClick={this.deleteProject}
                    >Удалить проект</button>
                </div>
                <div class="d-flex flex-row vh-100 overflow-hidden" >
                    {/* To Do */}
                    <div class="d-flex flex-column flex-nowrap border-bottom px-sm-2 px-3 pt-2" style={{ 'minWidth': '300px' }}>
                        <h5 class="mt-4">To do</h5>
                        <button class="w-100 btn btn-light btn-block" onClick={(e) => { this.addTask("To Do", e) }}>+</button>
                        <div class="overflow-y-auto flex-column flex-nowrap">
                            <ul class="list-group">
                                {Array.isArray(this.state.content["To Do"]) && this.state.content["To Do"].length != 0 ?
                                    this.state.content["To Do"].map((todo, index) => {
                                        return (
                                            <li class="list-group-item ">
                                                <div class="border-bottom">{todo.title}</div>
                                                <div>{todo.subtitle}</div>
                                                <div class="d-flex flex-row flex-nowrap justify-content-between">
                                                    <button class="btn btn-outline-danger"
                                                        onClick={(e) => {
                                                            num = index;
                                                            sec = todo.section.toString();
                                                            this.deleteTask(num, sec, e)
                                                        }}
                                                    >Удалить</button>
                                                    <button class="btn btn-outline-success"
                                                        onClick={(e) => {
                                                            num = index;
                                                            sec = todo.section.toString();
                                                            this.editStage(num, sec, e);
                                                        }}
                                                    >{'==>'}</button>
                                                </div>
                                            </li>
                                        )
                                    })
                                    : <span>Тут ничего нет.<br /> Добавьте первую задачу</span>}
                            </ul>
                        </div>
                    </div>
                    {/* In progress */}
                    <div class="d-flex flex-column flex-nowrap border-bottom px-sm-2 px-3 pt-2" style={{ 'minWidth': '300px' }}>
                        <h5 class="mt-4">In progress</h5>
                        <button class="w-100 btn btn-light btn-block" onClick={(e) => { this.addTask("In progress", e) }}>+</button>
                        <div class="overflow-y-auto flex-column flex-nowrap">
                            <ul class="list-group">
                                {Array.isArray(this.state.content["In progress"]) && this.state.content["In progress"].length != 0 ?
                                    this.state.content["In progress"].map((todo, index) => {
                                        return (
                                            <li class="list-group-item ">
                                                <div class="border-bottom">{todo.title}</div>
                                                <div>{todo.subtitle}</div>
                                                <div class="d-flex flex-row flex-nowrap justify-content-between">
                                                    <button class="btn btn-outline-danger"
                                                        onClick={(e) => {
                                                            num = index;
                                                            sec = todo.section.toString();
                                                            this.deleteTask(num, sec, e)
                                                        }}
                                                    >Удалить</button>
                                                    <button class="btn btn-outline-success"
                                                        onClick={(e) => {
                                                            num = index;
                                                            sec = todo.section.toString();
                                                            this.editStage(num, sec, e);
                                                        }}
                                                    >{'==>'}</button>
                                                </div>
                                            </li>
                                        )
                                    })
                                    : <span>Тут ничего нет.<br /> Начните первую задачу</span>}
                            </ul>
                        </div>
                    </div>
                    {/* Completed */}
                    <div class="d-flex flex-column flex-nowrap border-bottom px-sm-2 px-3 pt-2" style={{ 'minWidth': '300px' }}>
                        <h5 class="mt-4">Completed</h5>
                        <button class="w-100 btn btn-light btn-block" onClick={(e) => { this.addTask("Completed", e) }}>+</button>
                        <div class="overflow-y-auto flex-column flex-nowrap">
                            <ul class="list-group">
                                {Array.isArray(this.state.content["Completed"]) && this.state.content["Completed"].length != 0 ?
                                    this.state.content["Completed"].map((todo, index) => {
                                        return (
                                            <li class="list-group-item ">
                                                <div class="border-bottom">{todo.title}</div>
                                                <div>{todo.subtitle}</div>
                                                <div class="d-flex flex-row flex-nowrap justify-content-between">
                                                    <button class="btn btn-outline-danger"
                                                        onClick={(e) => {
                                                            num = index;
                                                            sec = todo.section.toString();
                                                            this.deleteTask(num, sec, e)
                                                        }}
                                                    >Удалить</button>
                                                </div>
                                            </li>
                                        )
                                    })
                                    : <span>Тут ничего нет.<br /> Закончите первую задачу</span>}
                            </ul>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}
export default withRouter(BoardUser);