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
import AppLayout from "./layout.jsx/app.layout";
import AuthLayout from "./layout.jsx/auth.layout";
import authVerify from "./common/auth-verify";
import AuthVerify from "./common/auth-verify";
import { type } from "@testing-library/user-event/dist/type";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    
    this.state = {
      currentUser: undefined,
      // isAuthenticated:false,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    if (user) {
      this.setState({
        currentUser: user,
        // isAuthenticated: true,
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

  // type AuthContextType = {
  //   isAuthenticated: boolean; // флаг, показывающий, аутентифицирован ли пользователь
  //   setAuth: (auth: boolean) => void; // функция для изменения значения isAuthenticated
  // };
  
  // const AuthContext = createContext<AuthContextType>({
  //   isAuthenticated: false,
  //   setAuth: () => { },
  // });
  
  render() {
    const currentUser = this.state.currentUser;
    // const [isAuthenticated,setAuth]=useState<Boolean>(false);
    return (
      <div>
        
        <Routes>
          
          {currentUser ? (
            <Route path="/" element={<AppLayout />}>
              <Route path="/" element={<Login />} />
              {/* <Route path="/" element={<Profile />} /> */}
              {/* <Route path="login" element={<Login />} /> */}
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
      </div>
    );
  }
}

export default App;