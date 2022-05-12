import React, { useState } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import UserService from "services/user.service";
import AuthService from "services/auth.service";

import './friend-request.css';

export default function FriendRequest() {

  const [friendUsername, setFriendUsername] = useState("");

  const onChangeUsername = (e) => {
    setFriendUsername(e.target.value)
  };

  const required = value => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };

  const sendRequest = () => {
    UserService.sendFriendRequest(AuthService.getCurrentUser().uid, friendUsername)
  }

  return (
    <div>
      <input type="text" onChange={onChangeUsername} value="username"></input>
      <button onClick={sendRequest}>Send Friend Request</button>
    </div>
  )
}