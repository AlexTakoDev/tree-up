import {
  URL_BACK_GET_PROFILE,
  URL_BACK_GET_PROFILE_EDIT,
  URL_BACK_NEW_EXPERIENCE,
  URL_BACK_UPDATE_EXPERIENCE,
  URL_BACK_DELETE_EXPERIENCE,
  URL_BACK_NEW_SOFTSKILL,
  URL_BACK_UPDATE_SOFTSKILL,
  URL_BACK_DELETE_SOFTSKILL,
  URL_BACK_UPDATE_USER
} from "../../constants/urls/urlBackEnd";
import apiGateway from "./apiGateway";
import { getToken } from "../../services/tokenServices";

const config = () => {
  const token = getToken();
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return { headers };
};


export function getProfile(uuid) {
  return apiGateway.get(URL_BACK_GET_PROFILE+uuid);
}

export function getProfileEdit() {
  return apiGateway.get(URL_BACK_GET_PROFILE_EDIT, config());
}

export function editProfile(values) {
  console.log(values)
  return apiGateway.put(URL_BACK_UPDATE_USER, values, config());
}

export function postExperience(values) {
  console.log(values)
  return apiGateway.post(URL_BACK_NEW_EXPERIENCE, values, config())
}

export function updateExperience(values) {
  return apiGateway.post(URL_BACK_UPDATE_EXPERIENCE, values, config())
}

export function deleteExperience(values) {
  return apiGateway.post(URL_BACK_DELETE_EXPERIENCE, values, config())
}

export function postSoftSkill(values) {
  return apiGateway.post(URL_BACK_NEW_SOFTSKILL, values, config())
}

export function updateSoftSkill(values) {
  return apiGateway.post(URL_BACK_UPDATE_SOFTSKILL, values, config())
}

export function deleteSoftSkill(values) {
  return apiGateway.post(URL_BACK_DELETE_SOFTSKILL, values, config())
}