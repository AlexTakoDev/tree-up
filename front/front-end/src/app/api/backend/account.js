import {
  URL_BACK_AUTHENTICATE,
  URL_BACK_REGISTER,
  URL_BACK_USER,
} from "../../constants/urls/urlBackEnd";

import apiGateway from "./apiGateway";
import { getToken } from "../../services/tokenServices";

export function authenticate(values) {
  return apiGateway.post(URL_BACK_AUTHENTICATE, values);
}

export function registerUser(values) {
  return apiGateway.post(URL_BACK_REGISTER, values);
}

export function getUser(userId) {
  const token = getToken();
  return apiGateway.get(`/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function getUsers(){
  const token = getToken();
  return apiGateway.get(URL_BACK_USER, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
