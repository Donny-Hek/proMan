import React from 'react'

export default function sidebar() {
    return (
        <div>
            <div class="container-fluid">
                <div class="row flex-nowrap">
                    <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0" style="background-color: lightgray;">
                        <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 link-dark min-vh-100">
                            <a href="/" class="d-flex align-items-center pb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                                <span class="fs-5 d-none d-sm-inline">ProMan</span>
                            </a>
                            <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                                <li class="nav-item">
                                    <a href="#" class="nav-link align-middle px-0 link-dark">Главная</a>
                                </li>
                                <li>
                                    <a href="#" class="nav-link px-0 align-middle link-dark ">Новый проект</a>
                                </li>
                            </ul>
                            <hr />
                            <div class="dropdown pb-4">
                                <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                                    <li>
                                        <a href="#" class="nav-link px-0 align-middle link-dark">Профиль</a>
                                    </li>
                                    <li>
                                        <a href="#" class="nav-link px-0 align-middle link-dark">Выйти</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="col py-3">

                    </div>
                </div>
            </div>
        </div>
    )
}
