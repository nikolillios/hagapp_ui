import React, { Component, useEffect, useState, useCallback } from "react";
import { Route, Link, Routes, Router, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AuthService from "./services/auth.service";
import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import { Helmet } from "react-helmet";

const AuthContext = React.createContext(null);

const App = (props) => {
  //this.logOut = this.logOut.bind(this);
  const [currentUser, setCurrentUser] = useState(undefined)
  let [navigate, setNavigate] = useState()
  const [token, setToken] = useState(null);

  const wrapperSetToken = useCallback(val => {
    setToken(val);
  }, [setToken]);

  const logout = (e) => {
    e.preventDefault();
    AuthService.logout();
    setToken(null)
    alert("out");
  };

  return (
    <div className="app">
      <Helmet>
        <script async
          src='https://maps.googleapis.com/maps/api/js?key=AIzaSyC1ZoRawdEcGCJbSMAiEV6qcxIdyfwNDsI&callback=initMap'>
        </script>
      </Helmet>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          Hagapp
        </Link>
        {token ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile/"} className="nav-link">
                {token.username}
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
      <div className="the-container">
        <Routes>
          <Route path="/" element={(token) ? <Home /> : < Login setToken={wrapperSetToken} />} />
          <Route path="/home" element={(token) ? <Home /> : < Login setToken={wrapperSetToken} />} />
          <Route path="/login" element={<Login setToken={wrapperSetToken} />} />
          <Route path="/register" element={< Register />} />
          <Route path="/profile" element={(token) ? <Profile /> : < Login setToken={wrapperSetToken} />} />
        </Routes>
      </div>
    </div>
  );
}
export default App;