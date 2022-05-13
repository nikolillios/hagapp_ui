import React, { useState } from 'react'
import AuthService from 'services/auth.service'
import EventService from 'services/event.service'
import TimePicker from 'react-datetime-picker'
import DateTimePicker from 'react-datetime-picker'
import LocationPicker from 'react-google-map-picker'
import { useEffect } from 'react'
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
    EventService.create(AuthService.getCurrentUser().uid, description, invites.replace(' ', ''), datetime, nParticipants)
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

  useEffect(() => {

  })


  const handleLocationChange = ({ position, address, places }) => {
    setPos(position)
    setAddress(address)
  }

  const handleChangeZoom = (newZoom) => {
    setZoom(newZoom)
  }


  return (
    <div className="input-dialogue">
      <h4>Description</h4>
      <input type="text" onChange={onChangeDescription}></input><br />
      <h4>Event time</h4>
      <DateTimePicker onChange={setDatetime} value={datetime} />
      <input type="checkbox" checked={checked} onChange={handleCheckChange}></input>
      { }
      <h4>Location</h4>
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
      <h4>Num Participants</h4>
      <input type="number" onChange={onChangeNPart} min="1" max="10" value={nParticipants}></input>
      <h4>Invites</h4>
      <input type="text" onChange={onChangeInvites} value={invites} placeholder="enter usernames delimited by commas"></input><br />
      <button onClick={handleSubmit}>Create Challenge</button>
    </div>
  )
}