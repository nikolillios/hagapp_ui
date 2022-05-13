import React, { useState } from 'react'
import AuthService from 'services/auth.service'
import EventService from 'services/event.service'
import DateTimePicker from 'react-datetime-picker'
import LocationPicker from 'react-location-picker'
import { useEffect } from 'react'
import './create_challenge.css'
import LocationService from 'services/location.service'
const DefaultLocation = { lat: 0.0, lng: 0.0 }
const DefaultZoom = 10
export const ChallengeDialogue = () => {
  const [description, setDescription] = useState("")
  const [invites, setInvites] = useState("")
  const [nParticipants, setNParticipants] = useState(1)
  const [datetime, setDatetime] = useState("")
  const [address, setAddress] = useState("")
  const [pos, setPos] = useState(DefaultLocation)
  const [checked, setChecked] = useState(false)
  const [radius, setRadius] = useState(5)

  const [zoom, setZoom] = useState(DefaultZoom)

  const onChangeDescription = (e) => {
    setDescription(e.target.value)
  }

  const onChangeInvites = (e) => {
    setInvites(e.target.value)
  }

  const onChangeNPart = (e) => {
    setNParticipants(e.target.value)
  }

  const handleCheckChange = () => {
    setChecked((!checked))
  }

  const toStr = ({ lat, lng }) => {
    return lat.toString() + ',' + lng.toString()
  }

  const handleSubmit = () => {
    const id = AuthService.getCurrentUser().uid
    if (checked) {
      LocationService.create(id, description, toStr(pos), radius, datetime, nParticipants)
    } else {
      EventService.create(AuthService.getCurrentUser().uid, description, invites.replace(' ', ''), datetime, nParticipants)
    }
  }

  useEffect(() => {
    const getCurrentLocation = () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          console.log('coords')
          console.log(position.coords)
          const formatted = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
          setPos(formatted)
        }, () => { })
      }
    }
    getCurrentLocation()
  }, [])

  useEffect(() => {
    console.log("pos changed")
    console.log(pos)
  }, [pos])


  const handleLocationChange = ({ position, address, places }) => {
    console.log("handling location casdfs")
    console.log(position)
    console.log(address)
    console.log(places)
    setPos(position)
    setAddress(address)
  }

  const handleChangeZoom = (newZoom) => {
    setZoom(newZoom)
  }

  const onChangeRadius = (e) => {
    setRadius(e.target.value)
  }


  return (
    <div className="input-dialogue">
      <h3>Create Challenge</h3>
      <div className="dialogue">
        <h5>Description</h5>
        <input type="text" onChange={onChangeDescription}></input><br />
        <h5>Event time</h5>
        <DateTimePicker onChange={setDatetime} value={datetime} /><br />
        <label>Enable location</label>
        <input type="checkbox" checked={checked} onChange={handleCheckChange}></input>
        {checked ?
          <div>
            <label>Location</label>
            <p>Address: {address}</p>
            <p>Coords: {pos.lat} + "," + {pos.lng}</p>
            <label>Radius: {radius}</label>
            <input type="range" min="1" max="50" onChange={onChangeRadius} value={radius}></input>
            <LocationPicker
              zoom={zoom}
              containerElement={<div style={{ height: '100%' }} />}
              mapElement={<div style={{ height: '400px' }} />}
              defaultPosition={pos}
              onChange={handleLocationChange}
              onChangeZoom={handleChangeZoom}
              apiKey="AIzaSyC1ZoRawdEcGCJbSMAiEV6qcxIdyfwNDsI"
            />
          </div> :
          <div>
            <label>Invites</label>
            <input type="text" onChange={onChangeInvites} value={invites} placeholder="enter usernames delimited by commas"></input><br />
          </div>
        }
        <label>Num Participants</label>
        <input type="number" onChange={onChangeNPart} min="1" max="10" value={nParticipants}></input>
        <button onClick={handleSubmit}>Create Challenge</button>

      </div>
    </div>
  )
}