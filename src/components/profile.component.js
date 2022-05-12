import React, { Component } from "react";
import UserService from "../services/user.service";
export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ""
    };
  }
  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>{this.state.content}</h3>
          <p>Paragraph</p>
        </header>
      </div>
    );
  }
}