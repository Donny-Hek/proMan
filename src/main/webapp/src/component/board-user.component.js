import React, { Component } from "react";

import UserService from "../service/user.service";
import EventBus from "../common/EventBus";
import { withRouter } from "../common/with-router";
import { useParams } from "react-router-dom";

class BoardUser extends Component {
    constructor(props) {
        super(props);
        this.state = {

            content1: "",
            content2: ""
        };
    }

    componentDidMount() {
        UserService.getUserBoard().then(
            response => {
                this.setState({
                    content1: response.data
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
    }

    render() {
        // тут будут канбан

        return (
            <div className="container">
                <header className="jumbotron">
                    {/* <h3>{this.state.content1}</h3> */}
                </header>
                {/* {this.state.content2} */}
                
            </div>
        );
    }
}
export default withRouter(BoardUser);