import React, { useState } from 'react'
import AuthService from 'services/auth.service'
import EventService from 'services/event.service'
import TimePicker from 'react-datetime-picker'
import DateTimePicker from 'react-datetime-picker'
import LocationPicker from 'react-google-map-picker'
import { useEffect } from 'react'
import './create_challenge.css'
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

  const handleSubmit = () => {
    if (checked) {

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
        })
      }
    }
    getCurrentLocation()
  }, [])


  const handleLocationChange = ({ position, address, places }) => {
    setPos(position)
    setAddress(address)
  }

  const handleChangeZoom = (newZoom) => {
    setZoom(newZoom)
  }


  return (
    <div className="input-dialogue">
      <h3>Create Challenge</h3>
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
          <LocationPicker
            zoom={zoom}
            mapTypeId="roadmap"
            style={{ height: '400px' }}
            defaultPosition={pos}
            onChangeLocation={handleLocationChange}
            onChangeZoom={handleChangeZoom}
            apiKey=""
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
  )
}