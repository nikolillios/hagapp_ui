import axios from "axios";
const API_URL = "https://hagapp-api.azure-api.net/user/";
class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "login", {
        'uid': username,
        'password': password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        // need to load data for all fields
        return response.data;
      });
  }
  logout() {
    localStorage.removeItem("user");
  }
  register(username, email, password) {
    return axios.post(API_URL + "create-user", {
      uid: username,
      email: email,
      password: password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}
export default new AuthService();