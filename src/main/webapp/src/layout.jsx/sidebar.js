import React from 'react'
import { Component } from 'react';
import authService from '../service/auth.service';
import { Outlet } from 'react-router-dom';
import { withRouter } from '../common/with-router';

class Sidebar extends Component {
    render() {
        return (
            <div>
                <div class="container-fluid">
                    <div class="row flex-nowrap">
                        <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0  bg-dark" >
                            <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 link-light min-vh-100">
                                {/* <a href="/board" class="d-flex align-items-center pb-3 mb-md-0 me-md-auto link-light text-decoration-none">
                                    <span class="fs-5 d-none d-sm-inline">ProMan</span>
                                </a> */}
                                <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start">
                                    <li class="nav-item">
                                        <a href="/board" class="nav-link align-middle px-0 link-light">Главная</a>
                                    </li>
                                    <button class="btn btn-outline-info">Новый проект</button>
                                    {/* <li>
                                    <a href="#" class="nav-link px-0 align-middle link-dark ">Новый проект</a>
                                </li> */}
                                    {/* тут список из проектов + кнопка создания проектов */}
                                </ul>
                                
                                <div class="dropdown pb-2">
                                    <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start">
                                        <li>
                                            <a href="/profile" class="nav-link px-0 align-middle link-light">Профиль</a>
                                        </li>
                                        <li>
                                            <a href="/login" class="nav-link px-0 align-middle link-light"
                                                onClick={() => { authService.logout(); }}>
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
            </div>
        )
    }
}
export default withRouter(Sidebar);