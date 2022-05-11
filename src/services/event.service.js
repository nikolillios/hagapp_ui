import axios from "axios";
import authHeader from './auth-header';
const API_URL = "http://hagapp-api.azure-api.net/user/";
class EventService {

  create(uid, event_id, offered_users, event_time, num_participants, notes) {
    return axios
      .post(API_URL + "create-event", {
        headers: authHeader(), data: {
          'uid': uid,
          'id': event_id,
          'offered-users': offered_users,
          'event-time': event_time,
          'num-participants': num_participants,
          'notes': notes
        }
      })
      .then(response => {
        if (response.message === "Create Event Successful") {
          // reload user data
        }
      });
  }

  close(uid, event_id) {
    return axios
      .post(API_URL + "close-event", {
        headers: authHeader(), data: {
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
        headers: authHeader(), data: {
          'uid': uid,
          'id': event_id,
        }
      })
      .then(response => {
        if (response.message === "Accept Event Successful") {
          // reload user data - for past andavailable events?
          response['accepted-events']
        }
        return []
      });
  }

  delete(uid, event_id) {
    return axios
      .post(API_URL + "delete-event", {
        headers: authHeader(), data: {
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

  availbleEvents(uid) {
    return axios
      .post(API_URL + "available-events", {
        headers: authHeader(), data: {
          'uid': uid
        }
      })
      .then(response => {
        if (response.message === "Request Successful") {
          return response.events
        }
        return []
      });
  }

  pastEvents(uid) {
    return axios
      .post(API_URL + "past-events", {
        headers: authHeader(), data: {
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