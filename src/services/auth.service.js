import axios from "axios";
const API_URL = "https://hagapp-api.azure-api.net/user/";
class AuthService {
  login(username, password) {
    console.log('logging in')
    return axios
      .get(API_URL + "login", {
        params: {
          'uid': username,
          'password': password
        }
      })
      .then(response => {
        // console.log(response.data)
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
          console.log('got token')
        }
        console.log('returning data:' + JSON.stringify(response.data))
        // need to load data for all fields
        return response.data;
      });
  }
  logout() {
    localStorage.removeItem("user");
  }
  register(username, email, password) {
    return axios.post(API_URL + "create-user", null, {
      params: {
        'uid': username,
        'email': email,
        'password': password
      }
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}
export default new AuthService();