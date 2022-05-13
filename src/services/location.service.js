import axios from "axios";
import authHeader from './auth-header';
const API_URL = "https://hagapp-api.azure-api.net/location/";

class LocationService {

  getCurrentLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log('coords')
        console.log(position.coords)
        const formatted = `${position.coords.latitude},${position.coords.longitude}`
        return formatted
      })
    } else {
      return '0.0,0.0'
    }
  }

  create(uid, description, location, distance, event_time, num_participants) {
    console.log("loc")
    console.log(location)
    return axios
      .post(API_URL + "create-location-event", {
        'uid': uid,
        'id': Math.floor(Math.random() * 1e10).toString(),
        'loc': location,
        'dist': distance,
        'event-time': event_time,
        'num-participants': num_participants,
        'notes': description
      }, {
        headers: authHeader()
      })
      .then(response => {
        if (response.message === "Request Successful") {
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
      .post(API_URL + "close-location-event", {
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
          return "Success"
        }
        return "Failure"
      });
  }

  accept(uid, event_id, location) {
    return axios
      .post(API_URL + "accept-location-event", {
        'uid': uid,
        'id': event_id,
        'loc': location
      }, {
        headers: authHeader()
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
      .post(API_URL + "delete-location-event", {
        'uid': uid,
        'id': event_id,
      }, {
        headers: authHeader()
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

  async availableEvents(uid, currentPosition) {
    console.log("fgdfs")
    console.log(currentPosition)
    return axios
      .get(API_URL + "available-location-events", {
        headers: authHeader(),
        params: {
          'uid': uid,
          'loc': currentPosition,
        }
      })
      .then(response => {
        console.log(response.data)
        console.log(response.data.events)
        if (response.data.message === "Request Successful") {
          return response.data.events
        } else {
          throw Error('failed getting events')
        }
      });
  }
}

export default new LocationService();