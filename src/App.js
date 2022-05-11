import React, { Component, useEffect, useState } from "react";
import { Route, Link, Routes, Router, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AuthService from "./services/auth.service";
import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/profile.component";
import Profile from "./components/home.component";
import Challenge from "./components/challenge.component";
import ReactTable from "react-table";
import { PrivateRoute } from "components/PrivateRoute";

function App(props) {
  //this.logOut = this.logOut.bind(this);
  const [currentUser, setCurrentUser] = useState(undefined);

  let navigate = useNavigate();

  const logout = (e) => {
    e.preventDefault();
    AuthService.logout();
    alert("out");
  };

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  });

  console.log("current user " + currentUser);
  console.log({ currentUser })

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          Hagapp
        </Link>
        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile/"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login/" className="nav-link" onClick={logout}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login/"} className="nav-link">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/register/"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={(currentUser) ? <Home /> : < Login />} />
          <Route path="/user" element={(currentUser) ? <Profile /> : < Login />} />
          <Route path="/login" element={<Login navigate={navigate} />} />
          <Route path="/register" element={< Register />} />
          <Route path="/profile" element={currentUser ? <Profile /> : < Login />} />
        </Routes>
      </div>
    </div>
  );
}
export default App;