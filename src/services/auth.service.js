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
        console.log(response.data.accessToken)
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
          console.log('got token')
          console.log('returning data:' + JSON.stringify(response.data))
          return response.data
        } else {
          throw Error("Invalid Credentials")
        }
      });
  }
  logout() {
    alert("IN")
    localStorage.removeItem("user");
    console.log(localStorage.getItem("user"));
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
    console.log("log" + (localStorage.getItem('user') ? "null" : localStorage.getItem('user')))
    return (localStorage.getItem('user') ? false : JSON.parse(localStorage.getItem('user')));
  }
}
export default new AuthService();