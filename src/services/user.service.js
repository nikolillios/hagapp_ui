import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'https://hagapp-api.azure-api.net/user/';
class UserService {

  sendFriendRequest(uid, target_uid) {
    axios.post(API_URL + 'send-friend-request', { 'uid': uid, 'target-uid': target_uid }, {
      headers: authHeader()
    }).then(response => {
      if (response.message === "Request Successful")
        console.log("freind request sent")
      else
        console.log(response)
    });
  }

  acceptFriendRequest(uid, target_uid) {
    axios.get(API_URL + 'accept-friend-request', {
      headers: authHeader(),
      params: { 'uid': uid, 'target-uid': target_uid }
    }).then(response => {
      if (response.message === "Request Successful")
        // reload user datawith api call and bind results
        return response.data
    });
  }

  rejectFriendRequest(uid, target_uid) {
    axios.get(API_URL + 'reject-friend-request', {
      headers: authHeader(),
      params: { 'uid': uid, 'target-uid': target_uid },
    }).then(response => {
      if (response.message === "Request Successful")
        // reload user datawith api call and bind results
        return response.data
    });
  }

  getFriends(uid) {
    console.log("getting friends")
    console.log(API_URL + 'get-friends')
    return axios.get(API_URL + 'get-friends', {
      headers: authHeader(),
      params: {
        'uid': uid
      },
    }).then(response => {
      if (response.message === "Request Successful") {
        console.log("response")
        console.log(response)
        // reload user datawith api call and bind results
        return response.data
      } else {
        return response.data
      }
    });
  }

  getUserData() {

  }


  getPublicContent() {
    return axios.get(API_URL + 'all');
  }
  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }
}
export default new UserService();