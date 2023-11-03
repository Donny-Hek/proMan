import React from "react";
import { Component } from "react";
import authService from "../service/auth.service";
import { Outlet } from "react-router-dom";
import { withRouter } from "../common/with-router";
import projectsService from "../service/projects.service";

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
    projectsService.getAll()
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

  async addBoard(e, nameProj) {
    await projectsService.create(this.state.count, nameProj)
      .then((response) => {
        this.setState((prevState) => {
          return {
            links: prevState.links.push(response.data),
            count: prevState.count + 1
          }
        });
        this.props.router.navigate("/board/" + response.data.id)
        window.location.reload();
      });
  }

  render() {
    return (
      <div class="d-flex flex-nowrap">
        <div class="d-flex flex-column px-sm-2 px-3 pt-2
        bg-dark vh-100 overflow-hidden" style={{ width: '230px', 'min-width': '200px' }}>
          {/*кнопки*/}
          <div class="flex-column align-items-center nav">
            <a
              href="/profile"
              class="nav-link px-0 align-middle link-light"
            >
              Профиль
            </a>
            <a
              href="/login"
              class="nav-link px-0 align-middle link-warning"
              onClick={() => {
                authService.logout();
              }}
            >
              Выйти
            </a>
            <button
              class="btn btn-outline-light"
              onClick={() => {
                let nameProj = prompt('Введите название:', ['Новый проект']);
                if (nameProj == null) return;
                else this.addBoard(this, nameProj);
              }}
            >
              Новый проект
            </button>
          </div>
          {/*список*/}
          <div class="overflow-y-auto flex-column flex-nowrap nav px-3 pt-2">
            {this.state.message && (
              <li class="list-group-item">
                <span class="px-0 align-middle link-light">{this.state.message}</span>
              </li>
            )}
            {Array.isArray(this.state.links) ?
              this.state.links.map(board => {
                return (<li class="list-group-item">
                  <a href={"/board/" + board.id} class="nav-link px-0 align-middle ">{board.name}</a>
                </li>)
              }) : null}
          </div>
        </div>
        {/* <div class="px-3 pt-2"> */}
        <Outlet />
        {/* </div> */}
      </div>
    );
  }
}
export default withRouter(Sidebar);
