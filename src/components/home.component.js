import { getByTestId } from '@testing-library/react';
import React, { Component, useState, Form, useEffect, } from 'react';
import AuthService from "../services/auth.service";
import Table from './Table';
import FriendsTable from './FriendsTable';
import FriendRequest from './friend_request.component';
import './profile.css';
import SettledChallengesTable from './SettledChallengesTable';
import IncomingFriendRequests from './incoming_friend_request';
import { ChallengeDialogue } from './create_challenge.component';
import UserService from 'services/user.service';
import EventService from 'services/event.service';


export default function Home() {
  const challenges1 = React.useMemo(() => [
    { id: "1", userEmail: "nikolillios09@gmail.com", description: "This is a challenge for you.", status: "open", result: " " },
    { id: "2", userEmail: "nikolillios09@gmail.com", description: "Another challenge.", status: "accepted", result: " " },
    { id: "3", userEmail: "kevin@gmail.com", description: "Another challenge2.", status: "finished", result: '1-0 kevin' },
    { id: "4", userEmail: "kat@gmail.com", description: "Another challenge3.", status: "finished", result: '1-0 kat' },
  ]);

  const requests = React.useMemo(() => [
    { username: "Kevin" },
    { username: "Mack" },
    { username: "Will" }
  ]);
  const [challenges, setChallenges] = useState([])
  const [settled, setSettled] = useState([])

  const [friends, setFriends] = useState([])
  const [incomingRequests, setIncomingRequests] = useState([])
  const [outgoingRequests, setOutgoingRequests] = useState([])

  const formatFriends = (friends) => {
    return Array.from(friends.map(name => ({ 'username': name })).values())
  }

  useEffect(() => {
    const getFriends = async () => {
      try {
        const data = await UserService.getFriends(AuthService.getCurrentUser().uid)
        setFriends(formatFriends(data.friends))
        setIncomingRequests(formatFriends(data["incoming-friend-requests"]))
        setOutgoingRequests(formatFriends(data["outgoing-friend-requests"]))
      } catch (e) {
        console.log(e)
      }
    };
    getFriends()
  }, [])

  useEffect(() => {
    const getSettled = async () => {
      try {
        const data = await EventService.pastEvents(AuthService.getCurrentUser().uid)
        console.log("DATA")
        console.log(data)
        setSettled(data)
      } catch (e) {
        console.log(e)
      }
    };
    getSettled()
  }, [])

  return (
    <div className="container">
      <div>
        <h3>Friends</h3>
        <FriendsTable data={friends}></FriendsTable>
        <h3>Send Friend Request</h3>
        <FriendRequest></FriendRequest>
        <h3>Incoming</h3>
        <IncomingFriendRequests data={incomingRequests}></IncomingFriendRequests>
      </div>
      <div className="main">
        <div>
          <h1>Open challenges</h1>
          <Table data={React.useMemo(() => challenges, [])} />
          <h1>Settled</h1>
          <SettledChallengesTable data={React.useMemo(() => settled, [])}></SettledChallengesTable>
        </div>
      </div>
      <div>
        <h1>Create Challenge</h1>
        <ChallengeDialogue />
      </div>
    </div >
  );
}