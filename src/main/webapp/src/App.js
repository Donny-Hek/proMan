import React, { Component, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./service/auth.service";

import Login from "./component/login.component";
import Register from "./component/register.component";
// import Home from "./component/home.component";
import Profile from "./component/profile.component";
import BoardUser from "./component/board-user.component";

// import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";
import AppLayout from "./layout/app.layout";
import AuthLayout from "./layout/auth.layout";
import authVerify from "./common/auth-verify";
import AuthVerify from "./common/auth-verify";
import { type } from "@testing-library/user-event/dist/type";
import Home from "./component/home.component";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    if (user) {
      this.setState({
        currentUser: user,
      });
    }

    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      currentUser: undefined,
    });
  }

  render() {
    const currentUser = this.state.currentUser;
    return (
      <div>
        <Routes>
          {currentUser ? (
            <Route path="/" element={<AppLayout />}>
              <Route path="profile" element={<Profile />} />
              <Route path="home" element={<Home />} />
              <Route path="board" element={<BoardUser />} />
              <Route path="board/:id" element={<BoardUser />} />
            </Route>
          ) : (
            <Route path="/" element={<AuthLayout />}>
              <Route path="/" element={<Login />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>
          )
          }
        </Routes>
      </div>
    );
  }
}

export default App;