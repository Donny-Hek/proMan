import React, { Component } from "react";

import EventBus from "../common/EventBus";
import { withRouter } from "../common/with-router";
import projectsService from "../service/projects.service";
import { DragDropContext } from "react-beautiful-dnd";
import { parse } from "uuid";

class BoardUser extends Component {
    constructor(props) {
        super(props);
        this.deleteProject = this.deleteProject.bind(this);
        this.addTask = this.addTask.bind(this);

        this.state = {
            id: "",
            pName: "",
            content: {
                "To Do": [],
                "In progress": [],
                "Completed": []
            }//нужно ли поле?
            // ['To do']: [],
            // ['In progress']: [],
            // ['Completed']: []
        };
    }

    async componentDidMount() {
        let url = window.location.href;
        url = url.substring(url.lastIndexOf('/'));
        url = url.replace("/", "");
        await projectsService.getProject(url);
        let projects = await projectsService.getObjProject(url);
        this.setState({
            id: projects.id,
            pName: projects.name,
            content: JSON.parse(projects.content)
        });

    }

    deleteProject(e) {
        e.preventDefault();
        projectsService.delete(this.state.id)
            .then(() => {
                localStorage.removeItem(this.state.id);
                this.props.router.navigate("/profile");
                window.location.reload()
            });
    }
    getContent() {
        // return (

        // );
    }
    async addTask(e) {
        e.preventDefault();
        let name = prompt('Введите название:', ['To Do']);
        let det = prompt('Введите детали:', ['details']);
        let todo = await projectsService.addToDo(name, det, 'To Do');
        let newState = this.state.content["To Do"].push(todo);
        this.setState({
            content: {
                'To Do': newState
            }
        });
    }

    render() {
        return (
            <div class="px-5 py-3 flex-nowrap" >
                {/* width: '1000px',  style={{ width: '100vh'}}*/}
                <h4 class="col">
                    {this.state.pName}
                </h4>
                <button className="remove-buttons" class="col btn btn-outline-danger px-3"
                    onClick={this.deleteProject}
                >Удалить проект</button>
                {/* <DragDropContext onDragEnd={(result) => handleDragEnd(result)}> */}
                <div class="row overflow-hidden" >
                    {/* {this.outpColumn(this.state.content)} */}
                    <div class="col border-bottom" style={{ 'minWidth': '300px' }}>
                        <h5 class="mt-4">To do</h5>
                        <button class="w-100 btn btn-light btn-block" onClick={this.addTask}>+</button>
                        {(this.state.content["To Do"].length) ?
                            <span>Тут что-то есть</span>
                            : <span>Тут ничего нет.<br /> Добавьте первую задачу</span>}
                    </div>
                    <div class="col border-bottom" style={{ 'minWidth': '300px' }}>
                        <h5 class="mt-4">In progress</h5>
                        {/* <button class="w-100 btn btn-light btn-block">+</button> */}
                        {(this.state.content["To Do"].length) ?
                            <span>Тут что-то есть</span>
                            : <span>Тут ничего нет.<br /> Добавьте первую задачу</span>}
                    </div>
                    <div class="col border-bottom" style={{ 'minWidth': '300px' }}>
                        <h5 class="mt-4">Completed</h5>
                        {/* <button class="w-100 btn btn-light btn-block">+</button> */}
                        {(this.state.content["To Do"].length) ?
                            <span>Тут что-то есть</span>
                            : <span>Тут ничего нет.<br /> Добавьте первую задачу</span>}
                    </div>
                </div>
                {/* </DragDropContext> */}
            </div>
        );
    }
}
export default withRouter(BoardUser);