import React, { Component } from "react";

import UserService from "../service/user.service";
import EventBus from "../common/EventBus";
import { withRouter } from "../common/with-router";
import { useParams } from "react-router-dom";

class BoardUser extends Component {
    constructor(props) {
        super(props);
        this.state = {

            content: ""
        };
    }

    componentDidMount() {
        UserService.getUserBoard().then(
            response => {
                this.setState({
                    content: response.data
                });
            },
            error => {
                this.setState({
                    content:
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString()
                });

                if (error.response && error.response.status === 401) {
                    EventBus.dispatch("logout");
                }
            }
        );
        // UserService.printAllProjects().then(
        //     response => {
        //         this.setState({
        //             projectList: response.data
        //         });
        //     }
        // );
    }

    render() {
        // тут будут канбан

        return (
            <div className="container">
                <header className="jumbotron">
                    <h3>{this.state.content}</h3>
                </header>
                тут контент для главной домашней страницы
            </div>
        );
    }
}
export default withRouter(BoardUser);