import React, { Component } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./service/auth.service";

import Login from "./component/login.component";
import Register from "./component/register.component";
// import Home from "./component/home.component";
import Profile from "./component/profile.component";
import BoardUser from "./component/board-user.component";

import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";
import AppLayout from "./layout.jsx/app.layout";
import AuthLayout from "./layout.jsx/auth.layout";

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
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (
      <div>
        <Routes>
          {currentUser ? (
            <Route path="/" element={<AppLayout />}>
              <Route path="/" element={<Profile />} />
              <Route path="login" element={<Login />} />
              <Route path="profile" element={<Profile />} />
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
        {/* <AuthVerify logOut={this.logOut} /> */}
      </div>
    );
  }
}

export default App;