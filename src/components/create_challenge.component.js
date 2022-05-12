import React, { useState } from 'react'
import AuthService from 'services/auth.service'
import EventService from 'services/event.service'
import TimePicker from 'react-datetime-picker'
import DateTimePicker from 'react-datetime-picker'

export const ChallengeDialogue = () => {
  const [description, setDescription] = useState("")
  const [invites, setInvites] = useState("")
  const [nParticipants, setNParticipants] = useState(1)
  const [datetime, setDatetime] = useState("")

  const onChangeDescription = (e) => {
    setDescription(e.target.value)
  }

  const onChangeInvites = (e) => {
    setInvites(e.target.value)
  }

  const onChangeNPart = (e) => {
    setNParticipants(e.target.value)
  }

  const onChangeDatetime = (e) => {
    setDatetime(e.target.value)
  }

  const handleSubmit = () => {
    EventService.create(AuthService.getCurrentUser().uid, description, invites.replace(' ', ''), datetime, nParticipants,)
  }


  return (
    <div className="input-dialogue">
      <h4>Description</h4>
      <input type="text" onChange={onChangeDescription}></input><br />
      <h4>Event time</h4>
      <DateTimePicker onChange={onChangeDatetime} value={datetime} />
      <h4>Num Participants</h4>
      <input type="number" onChange={onChangeNPart} min="1" max="10" value={nParticipants}></input>
      <h4>Invites</h4>
      <input type="text" onChange={onChangeInvites} value={invites} placeholder="enter usernames delimited by commas"></input><br />
      <button onClick={handleSubmit}>Create Challenge</button>
    </div>
  )
}