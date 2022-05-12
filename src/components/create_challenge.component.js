import React, { useState } from 'react'
import AuthService from 'services/auth.service'
import EventService from 'services/event.service'

export const ChallengeDialogue = () => {
  const [description, setDescription] = useState("")

  const onChangeDescription = (e) => {
    setDescription(e.target.value)
  }

  const handleSubmit = () => {
    const now = new Date.now()
    EventService.create(AuthService.getCurrentUser().uid, description, ['kxc4'], now.toISOString(), 2)
  }

  return (
    <div className="input-dialogue">
      <input type="text" onChange={onChangeDescription}></input>
      <button onClick={handleSubmit}>Create Challenge</button>
    </div>
  )
}