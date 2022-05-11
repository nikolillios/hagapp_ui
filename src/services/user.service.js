import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'http://hagapp-api.azure-api.net/user/';
class UserService {

  sendFriendRequest(uid, target_uid) {
    axios.post(API_URL + 'send-freind-request', {
      headers: authHeader(),
      data: { uid: uid, target_uid: target_uid }
    }).then(response => {
      if (response.message === "Request Successful")
        // reload user datawith api call and bind results
        return
    });
  }

  acceptFriendRequest(uid, target_uid) {
    axios.post(API_URL + 'accept-freind-request', {
      headers: authHeader(),
      data: { uid: uid, target_uid: target_uid }
    }).then(response => {
      if (response.message === "Request Successful")
        // reload user datawith api call and bind results
        return
    });
  }

  rejectFriendRequest(uid, target_uid) {
    axios.post(API_URL + 'reject-freind-request', {
      headers: authHeader(),
      data: { uid: uid, target_uid: target_uid }
    }).then(response => {
      if (response.message === "Request Successful")
        // reload user datawith api call and bind results
        return
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