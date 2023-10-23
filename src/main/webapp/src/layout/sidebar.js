import React from "react";
import { Component } from "react";
import authService from "../service/auth.service";
import { Outlet } from "react-router-dom";
import { withRouter } from "../common/with-router";
import projectsService from "../service/projects.service";
import userService from "../service/user.service";
import { useState } from "react";

class Sidebar extends Component {// extends Component 
  constructor(props) {
    super(props);
    this.addBoard = this.addBoard.bind(this);

    this.state = {
      links: [],
      message: "",
      count: 0
    };
  }

  componentDidMount() {
    userService.getUserBoard()
      .then((response) => {
        if (response.data == 0) {
          this.setState({
            message: "У вас пока нет проектов"
          });
        } else {
          this.setState({
            links: response.data,
            count: response.data.length
          });
        }
      });
  }

  addBoard(e) {
    e.preventDefault();
    projectsService.create(this.state.count)
      .then((response) => {
        // if (response.data != 0) {
        this.setState((prevState) => {
          return {
            links: prevState.links.push(response.data),
            count: prevState.count + 1
          }
        });
        // }
        this.props.router.navigate("/board/" + response.data.id)
        window.location.reload();
      });
  }

  render() {
    return (
      <div>
        <div class="container-fluid">
          <div class="row flex-nowrap">
            <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0  bg-dark">
              <div class="d-flex flex-column align-items-center align-items-sm-start bg-dark px-3 pt-2 link-light min-vh-100">
                {/* <span class="fs-5 d-none d-sm-inline">ProMan</span> */}
                <div class="nav nav-pills flex-column scrollarea mb-sm-auto mb-0 align-items-center align-items-sm-start">
                  <button
                    class="btn btn-outline-light"
                    onClick={this.addBoard}
                  >
                    Новый проект
                  </button>
                  {this.state.message && (
                    <li class="list-group-item">
                      <span class="px-0 align-middle">{this.state.message}</span>
                    </li>
                  )}
                  {
                    Array.isArray(this.state.links) ?
                      this.state.links.map(board => {
                        return (<li class="list-group-item">
                          <a href={"/board/" + board.id} class="nav-link px-0 align-middle ">{board.name}</a>
                        </li>)
                      })
                      : null
                  }
                </div>

                <div class="dropdown pb-2">
                  <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start">
                    <li>
                      <a
                        href="/profile"
                        class="nav-link px-0 align-middle link-light"
                      >
                        Профиль
                      </a>
                    </li>
                    <li>
                      <a
                        href="/login"
                        class="nav-link px-0 align-middle link-light"
                        onClick={() => {
                          authService.logout();
                        }}
                      >
                        Выйти
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col py-3">
              <Outlet />
            </div>
          </div>
        </div>
      </div >
    );
  }
}
export default withRouter(Sidebar);
