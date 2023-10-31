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
        this.myPer = [];

        this.state = {
            id: "",
            pName: "",
            content: {
                "To Do": [],
                "In progress": [],
                "Completed": []
            }
            // mes1: "",
            // mes2: "",
            // mes3: ""
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

            // mes1: boomes1,
            // mes2: boomes2,
            // mes3: boomes3
        });

    }

    deleteProject(e) {
        e.preventDefault();
        projectsService.delete(this.state.id)
            .then(() => {
                localStorage.removeItem(this.state.id);
                this.props.router.navigate("/home");
                window.location.reload()
            });
    }
    getContent() {
        // return (

        // );
    }
    addTask(e) {
        e.preventDefault();
        let name = prompt('Введите название:', ['To Do']);
        let det = prompt('Введите детали:', ['details']);
        // let todo = 
        projectsService.addToDo(name, det, 'To Do', this.state.id);

        // let newState = this.state.content["To Do"];
        // console.log(this.myPer);
        // this.myPer.push(todo);

        // alert(this.myPer.map((item) => (item.title)));
        // if (newState.isArray) newState.push(todo);
        // else newState = [todo];
        // Array.isArray(newState)?
        //     newState.push(todo) :
        //     newState;

        // alert(this.state.content["To Do"].map((item) => (item.title)));

        // let newState = this.state.content["To Do"];
        // return this.setState({
        //     content: {
        //         'To Do': newState
        //     }
        // });
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
                    {/* To Do */}
                    <div class="col border-bottom" style={{ 'minWidth': '300px' }}>
                        <h5 class="mt-4">To do</h5>
                        <button class="w-100 btn btn-light btn-block" onClick={this.addTask}>+</button>
                        <ul class="list-group">
                            {Array.isArray(this.state.content["To Do"]) && this.state.content["To Do"].length != 0 ?
                                this.state.content["To Do"].map((todo) => {
                                    return (
                                        <li class="list-group-item ">
                                            <div class="border-bottom">{todo.title}</div>
                                            <div>{todo.subtitle}</div>
                                        </li>
                                    )
                                })
                                : <span>Тут ничего нет.<br /> Добавьте первую задачу</span>}
                        </ul>
                    </div>
                    {/* In progress */}
                    <div class="col border-bottom" style={{ 'minWidth': '300px' }}>
                        <h5 class="mt-4">In progress</h5>
                        {Array.isArray(this.state.content["In progress"]) && this.state.content["In progress"].length != 0 ?
                            this.state.content["In progress"].map((todo) => {
                                return (
                                    <li class="list-group-item ">
                                        <div class="border-bottom">{todo.title}</div>
                                        <div>{todo.subtitle}</div>
                                    </li>
                                )
                            })
                            : <span>Тут ничего нет.<br /> Начните первую задачу</span>}
                    </div>
                    {/* Completed */}
                    <div class="col border-bottom" style={{ 'minWidth': '300px' }}>
                        <h5 class="mt-4">Completed</h5>
                        {Array.isArray(this.state.content["Completed"]) && this.state.content["Completed"].length != 0 ?
                            this.state.content["Completed"].map((todo) => {
                                return (
                                    <li class="list-group-item ">
                                        <div class="border-bottom">{todo.title}</div>
                                        <div>{todo.subtitle}</div>
                                    </li>
                                )
                            })
                            : <span>Тут ничего нет.<br /> Закончите первую задачу</span>}
                        {/* {(this.state.content["To Do"].length) ?
                            <span>Тут что-то есть</span>
                            : <span>Тут ничего нет.<br /> Добавьте первую задачу</span>} */}
                    </div>
                </div>
                {/* </DragDropContext> */}
            </div>
        );
    }
}
export default withRouter(BoardUser);