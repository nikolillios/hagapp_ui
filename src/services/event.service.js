import axios from "axios";
import authHeader from './auth-header';
const API_URL = "https://hagapp-api.azure-api.net/event/";
class EventService {

  create(uid, description, offered_users, event_time, num_participants) {
    return axios
      .post(API_URL + "create-event", {
        'uid': uid,
        'id': Math.floor(Math.random() * 1e10),
        'offered-users': offered_users,
        'event-time': event_time,
        'num-participants': num_participants,
        'description': description
      }, {
        headers: authHeader()
      })
      .then(response => {
        if (response.message === "Create Event Successful") {
          // reload user data
        }
      });
  }

  close(uid, event_id) {
    return axios
      .get(API_URL + "close-event", { headers: authHeader() },
        {
          params: {
            'uid': uid,
            'id': event_id,
          }
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
      .post(API_URL + "accept-event", {
        'uid': uid,
        'id': event_id,
      }, {
        headers: authHeader(),
      })
      .then(response => {
        if (response.message === "Accept Event Successful") {
          // reload user data - for past andavailable events?
          console.log("success")
        }
        return []
      });
  }

  delete(uid, event_id) {
    return axios
      .post(API_URL + "delete-event", {
        'uid': uid,
        'id': event_id,
      }, {
        headers: authHeader(),
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
        if (response.message === "Request Successful") {
          return {
            'past-events': response['past-events'],
            'accepted-events': response['accepted-events']
          }
        }
        return []
      });
  }

}

export default new EventService();