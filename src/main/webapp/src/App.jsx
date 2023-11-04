import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthLayout from "./layout/auth.layout";
import AuthService from "./service/auth.service";
import Sidebar from "./layout/sidebar";
import EventBus from "./common/EventBus";

import Login from "./component/login.component";
import Register from "./component/register.component";
import Home from "./component/home.component";
import Profile from "./component/profile.component";
import BoardUser from "./component/board-user.component";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: null
    };
  }

  async componentDidMount() {
    const user = await AuthService.getCurrentUser();
    if (user) {
      this.setState({
        currentUser: user
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
      currentUser: undefined
    });
  }

  render() {
    const currentUser = this.state.currentUser;
    return (
      <div>
        <Routes>
          {currentUser ? (
            <Route path="/" element={<Sidebar />}>
              <Route path="profile" element={<Profile />} />
              <Route path="/" element={<Home />} />
              <Route path="board" element={<Home />} />
              <Route path="board/:id" element={<BoardUser />} />
            </Route>
          ) : (
            <Route path="/" element={<AuthLayout />}>
              <Route path="/" element={<Login />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>
          )}
        </Routes>
      </div>
    );
  }
}

export default App;