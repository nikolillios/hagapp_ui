import React, { useState } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import UserService from "services/user.service";

export default function FriendRequest({ props }) {

  const [friend_username, set_friend_username] = useState("");

  const onChangeUsername = (e) => {
    set_friend_username(e.target.value)
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

  const handleSubmit = (e) => {
    alert(friend_username);
    return
    //UserService.create_friend_request
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <Input
          type="text"
          className="form-control"
          name="username"
          value={friend_username}
          onChange={onChangeUsername}
          validations={[required]}
        />
      </div>
      <div className="form-group">
        <button
          className="btn btn-primary btn-block"
        >
          <span>Login</span>
        </button>
      </div>
    </Form>
  )
}