import { getByTestId } from '@testing-library/react';
import React, { Component, useState, Form, } from 'react';
import AuthService from "../services/auth.service";
import Table from './Table';
import FriendsTable from './FriendsTable';
import FriendRequest from './friend_request.component';
import './profile.css';
import SettledChallengesTable from './SettledChallengesTable';


export default function Home() {
  const challenges = React.useMemo(() => [
    { id: "1", userEmail: "nikolillios09@gmail.com", description: "This is a challenge for you.", status: "open", result: " " },
    { id: "2", userEmail: "nikolillios09@gmail.com", description: "Another challenge.", status: "accepted", result: " " },
    { id: "3", userEmail: "kevin@gmail.com", description: "Another challenge2.", status: "finished", result: '1-0 kevin' },
    { id: "4", userEmail: "kat@gmail.com", description: "Another challenge3.", status: "finished", result: '1-0 kat' },
  ]);

  const friends = React.useMemo(() => [
    { username: "Kevin", email: "kxc4@cornell.edu", status: "friend" },
    { username: "Mack", email: "mac4@cornell.edu", status: "pending" },
    { username: "Will", email: "will@cornell.edu", status: "friend" },
  ]);

  const onRowClick = (state, rowInfo, column, instance) => {
    return {
      onClick: e => {
        console.log('A Td Element was clicked!')
        console.log('it produced this event:', e)
        console.log('It was in this column:', column)
        console.log('It was in this row:', rowInfo)
        console.log('It was in this table instance:', instance)
      }
    }
  }

  const filteredChallenges = challenges ? challenges.filter(challenge => challenge.status === "finished").map((challenge) => challenge) : [];

  return (
    <div className="container">
      <div>
        <h3>Friends</h3>
        <FriendsTable data={friends}></FriendsTable>
        <h3>Send Friend Request</h3>
        <FriendRequest></FriendRequest>
      </div>
      <div className="main">
        <div>
          <h1>Open challenges</h1>
          <Table data={challenges} />
          <h1>Settled</h1>
          <SettledChallengesTable data={filteredChallenges}></SettledChallengesTable>
        </div>
      </div>
    </div >
  );
}