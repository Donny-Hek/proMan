import React, { Component } from "react";

import EventBus from "../common/EventBus";
import { withRouter } from "../common/with-router";
import projectsService from "../service/projects.service";
import { DragDropContext } from "react-beautiful-dnd";

class BoardUser extends Component {
    constructor(props) {
        super(props);
        this.deleteProject = this.deleteProject.bind(this);

        this.state = {
            id: "",
            pName: "",
            content: [],//нужно ли поле?
            ['To do']: [],
            ['In progress']: [],
            ['Completed']: []
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
            content: projects.content
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
    // handleDragEnd(result) {

    // }

    render() {
        return (
            <div className="task-box" class="container px-4 py-5" style={{ width: '1000px', 'min-width':'500px'}}>
                <h5 className="task-box-title" class="">
                    {this.state.pName}
                    <button className="remove-buttons" class="btn btn-outline-danger px-3" onClick={this.deleteProject}>Удалить проект</button>
                </h5>
                {/* <DragDropContext onDragEnd={(result) => handleDragEnd(result)}> */}
                <div className="task-box-body" class="row">
                    <div className='column' class="d-flex col">
                        колонка 1
                        <button className="add-task">+</button>
                    </div>
                    <div className='column'class="d-flex col">
                        колонка 2
                        <button className="add-task">+</button>
                    </div>
                    <div className='column'class="d-flex col">
                        колонка 3
                        <button className="add-task">+</button>
                    </div>
                    {/* {
                        ['To do', 'In progress', 'Completed'].map(tag => (
                            <Column
                            // key={tag}
                            // tag={tag}
                            // events={events}
                            // setEvent={setEvent}
                            // currentEvent={currentEvent}
                            />
                        ))
                    } */}
                </div>
                {/* </DragDropContext> */}
            </div>
        );
    }
}
export default withRouter(BoardUser);