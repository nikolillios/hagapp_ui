import axios from "axios";
import authHeader from './auth-header';
const API_URL = "https://hagapp-api.azure-api.net/event/";
class EventService {

  create(uid, description, offered_users, event_time, num_participants) {
    console.log("props")
    console.log(offered_users)
    console.log(event_time)
    return axios
      .post(API_URL + "create-event", {
        'uid': uid,
        'id': Math.floor(Math.random() * 1e10).toString(),
        'offered-uids': offered_users,
        'event-time': event_time,
        'num-participants': num_participants,
        'notes': description
      }, {
        headers: authHeader()
      })
      .then(response => {
        if (response.message === "Create Event Successful") {
          // reload user data
        } else {
          console.log(response)
        }
      });
  }

  close(uid, event_id, result) {
    console.log("things")
    console.log(uid)
    console.log(event_id)
    console.log(result)
    return axios
      .post(API_URL + "close-event", {
        'uid': uid,
        'id': event_id,
        'result': result,
        'additional-notes': ""
      },
        {
          headers: authHeader()
        })
      .then(response => {
        if (response.message === "Request Successful") {
          // reload user data - for past andavailable events?
          return {
            'past-events': response['past-events'],
            'my-events': response['my-events']
          }
        }
        return []
      });
  }

  accept(uid, event_id) {
    return axios
      .get(API_URL + "accept-event", {
        headers: authHeader(),
        params: {
          'uid': uid,
          'id': event_id,
        }
      })
      .then(response => {
        if (response.message === "Accept Event Successful") {
          // reload user data - for past andavailable events?
          console.log("success")
        } else {
          console.log(response)
        }
      });
  }

  delete(uid, event_id) {
    return axios
      .get(API_URL + "delete-event", {
        headers: authHeader(),
        params: {
          'uid': uid,
          'id': event_id,
        }
      })
      .then(response => {
        if (response.message === "Request Successful") {
          // reload user data - for past andavailable events?
          return {
            'my-events': response['my-events']
          }
        }
        return []
      });
  }

  availableEvents(uid) {
    console.log("fgdfs")
    console.log(uid)
    return axios
      .get(API_URL + "available-events", {
        headers: authHeader(),
        params: {
          'uid': uid
        }
      })
      .then(response => {
        if (response.data.message === "Request Successful") {
          return response.data.events
        } else {
          throw Error('failed getting events')
        }
      });
  }

  pastEvents(uid) {
    return axios
      .get(API_URL + "past-events", {
        headers: authHeader(),
        params: {
          'uid': uid
        }
      })
      .then(response => {
        console.log(response.data)
        if (response.data.message === "Request Successful") {
          return response.data["past-events"]
        } else {
          throw Error("bad events")
        }
      });
  }

  acceptedEvents(uid) {
    return axios
      .get(API_URL + "accepted-events", {
        headers: authHeader(),
        params: {
          'uid': uid
        }
      })
      .then(response => {
        console.log(response.data)
        if (response.data.message === "Request Successful") {
          return response.data["accepted-events"]
        } else {
          throw Error("bad events")
        }
      });
  }

}

export default new EventService();