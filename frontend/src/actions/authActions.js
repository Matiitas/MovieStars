import axios from "axios";
import { SET_CURRENT_USER } from "./types";
import jwt from "jsonwebtoken";
import setAuthorizationToken from "../utils/setAuthorizationToken";

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user,
  };
}

export function login(data) {
  return (dispatch) => {
    return axios
      .post("http://localhost:5000/api/v1/users/login", data)
      .then((response) => {
        const token = response.data.token;
        localStorage.setItem("jwtToken", token);
        setAuthorizationToken(token);
        dispatch(setCurrentUser(jwt.decode(token)));
        return response;
      })
      .catch((e) => {
        setAuthorizationToken(null);
        throw e;
      });
  };
}

export function logout() {
  return (dispatch) => {
    localStorage.removeItem("jwtToken");
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
  };
}
