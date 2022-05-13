import axios from "axios";
const API_URL = "https://hagapp-api.azure-api.net/user/";
class AuthService {
  login(username, password) {
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
          console.log(localStorage.getItem('user'))
          console.log('returning data:' + JSON.stringify(response.data))
          return response.data
        } else {
          throw Error("Invalid Credentials")
        }
      });
  }
  logout() {
    localStorage.removeItem("user");
  }
  register(username, email, password) {
    return axios.get(API_URL + "create-user", {
      params: {
        'uid': username,
        'email': email,
        'password': password
      }
    });
  }

  getCurrentUser() {
    return (localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null);
  }
}
export default new AuthService();