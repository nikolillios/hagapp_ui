import React, { Component, useState, Form, useEffect, } from 'react';
import AuthService from "../services/auth.service";
import Table from './Table';
import FriendsTable from './FriendsTable';
import FriendRequest from './friend_request.component';
import SettledChallengesTable from './SettledChallengesTable';
import IncomingFriendRequests from './incoming_friend_request';
import { ChallengeDialogue } from './create_challenge.component';
import UserService from 'services/user.service';
import EventService from 'services/event.service';
import AcceptedChallenges from './AccptedChallenges';
import LocationService from 'services/location.service';
import LocationEvents from './LocationEvents';
import './home.css'


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
  const [accepted, setAccepted] = useState([])
  const [location, setLocation] = useState([{ 'id': ' ', 'uid': ' ', 'notes': ' ', "loc": ' ', 'accepted-uids': [' '] }])
  const [currentPosition, setCurrentPosition] = useState('0.0,0.0')
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);

  const [friends, setFriends] = useState([])
  const [incomingRequests, setIncomingRequests] = useState([])
  const [outgoingRequests, setOutgoingRequests] = useState([])
  const [watchID, setWatchID] = useState([])

  const formatFriends = (friends) => {
    return Array.from(friends.map(name => ({ 'username': name })).values())
  }

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

  useEffect(() => {
    getFriends()
  }, [])

  const getSettled = async () => {
    try {
      const data = await EventService.pastEvents(AuthService.getCurrentUser().uid)
      console.log("DATA")
      console.log(data)
      setSettled(data)
      console.log(data)
    } catch (e) {
      console.log(e)
    }
  };

  useEffect(() => {
    getSettled()
  }, [])

  const getOpen = async () => {
    try {
      const data = await EventService.availableEvents(AuthService.getCurrentUser().uid)
      console.log("DATA")
      console.log(data)
      setChallenges(data)
      console.log(data)
    } catch (e) {
      console.log(e)
    }
  };

  useEffect(() => {
    getOpen()
  }, [])

  const getAccepted = async () => {
    try {
      const data = await EventService.acceptedEvents(AuthService.getCurrentUser().uid)
      console.log("DATA")
      console.log(data)
      setAccepted(data)
      console.log(data)
    } catch (e) {
      console.log(e)
    }
  };

  useEffect(() => {
    getAccepted()
  }, [])

  const toStr = ({ lat, lng }) => {
    return `${lat},${lng}`
  }

  const setPosition = (position) => {
    console.log("before set")
    console.log(position)
    setCurrentPosition(position)
    console.log("after")
    console.log(position)
  }

  useEffect(() => {
    console.log("updating poistion ")
  }, [currentPosition])

  const getGeoInfo = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        position => {
          let coordinates = `${position.coords.longitude}, 
                   ${position.coords.latitude}`

          resolve(coordinates);
        },
        error => reject(error),
        { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
      )
    })
  }

  const getPosition = () => {
    if (!navigator.geolocation) {
      setStatus('Geolocation is not supported by your browser');
    } else {
      setStatus('Locating...');
      navigator.geolocation.getCurrentPosition((position) => {
        setStatus(null);
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
      }, () => {
        setStatus('Unable to retrieve your location');
        console.log(status)
      });
    }
  }

  const setLocationWrapper = () => {
    setLocation(`${lat},${lng}`)
  }

  // const getLocation = async () => {
  //   try {
  //     // let coordinates = '';
  //     // getGeoInfo.then(crdnts => coordinates = crdnts);
  //     console.log("newasdfasdf")
  //     // console.log(coordinates)
  //     // now coordinates have all relevant data you wished
  //     setLocationWrapper()
  //     console.log(`${lat},${lng}`)
  //     const data = await LocationService.availableEvents(AuthService.getCurrentUser().uid, status === null ? `${lat},${lng}` : '0.0,0.0')
  //     console.log("got location")
  //     console.log(data)
  //     setLocation(data)
  //     console.log(data)
  //   } catch (e) {
  //     console.log(e)
  //   }
  // };
  useEffect(() => {
    const interval = setInterval(() => {
      reloadData()
    }, 60000)
  })


  useEffect(() => {
    const getCurrentLocation = () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          const formatted = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
          console.log(formatted)
          setLat(formatted.lat)
          setLng(formatted.lng)
          const data = LocationService.availableEvents(AuthService.getCurrentUser().uid, `${position.coords.latitude},${position.coords.longitude}`).then((res) => { setLocation(res); console.log('res: ' + res) })
          // setLocation(data)
        }, () => { })
      }
    }
    getCurrentLocation()
    // getPosition()
    // getLocation()
  }, [])

  const reloadData = () => {
    getAccepted()
    getOpen()
    getSettled()
    getPosition()
    // getLocation()
    const getCurrentLocation = () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          const formatted = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
          console.log(formatted)
          setLat(formatted.lat)
          setLng(formatted.lng)
          const data = LocationService.availableEvents(AuthService.getCurrentUser().uid, `${position.coords.latitude},${position.coords.longitude}`).then(res => setLocation(res))
        }, () => { })
      }
    }
    getCurrentLocation()
  }

  useEffect(() => {
    setWatchID(navigator.geolocation.watchPosition((lastPosition) => {
      const getCurrentLocation = () => {
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition((position) => {
            const formatted = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            }
            console.log(formatted)
            setLat(formatted.lat)
            setLng(formatted.lng)
            const data = LocationService.availableEvents(AuthService.getCurrentUser().uid, `${position.coords.latitude},${position.coords.longitude}`).then((res) => { setLocation(res); console.log('res: ' + res) })
            console.log("got location")
            console.log(data)
            // setLocation(data)
            console.log(data)
          }, () => { })
        }
      }
      getCurrentLocation()
    }, (error) => alert.JSON.stringify(error))

      // getPosition()
      // getLocation()
    )
  }, [])


  return (
    <div className="container">
      <div className="flex-child" >
        <ChallengeDialogue reloadData={reloadData} />
        <h3>Friends</h3>
        <FriendsTable data={friends}></FriendsTable>
        <h3>Send Friend Request</h3>
        <FriendRequest></FriendRequest>
        <h3>Incoming</h3>
        <IncomingFriendRequests data={incomingRequests}></IncomingFriendRequests>
      </div>
      <div class="flex-child">
        <h1>Open challenges</h1>
        <Table data={challenges} reloadData={reloadData} />
        <p>Location Events</p>
        <LocationEvents data={location} reloadData={reloadData}></LocationEvents>
        <h3>Accepted</h3>
        <AcceptedChallenges data={accepted} reloadData={reloadData} />
        <h3>Settled</h3>
        <SettledChallengesTable data={settled}></SettledChallengesTable>
      </div>
    </div >
  );
}