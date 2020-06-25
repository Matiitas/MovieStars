import axios from "axios";

//si tenemos un token agregamos authorization header a cada request que hagamos, sino
// la quitamos
export default function setAuthorizationToken(token) {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
}
