import { URL_BACK_POST_AVATAR, URL_BACK_DELETE_AVATAR } from "../../constants/urls/urlBackEnd";
import apiGateway from "./apiGateway";
import { getToken } from "../../services/tokenServices";

const config = () => {
  const token = getToken();
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return { headers };
};

export function postAvatar(formData) {
  return apiGateway.post(URL_BACK_POST_AVATAR, formData, config(), {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}

export function deleteAvatar() {
  return apiGateway.get(URL_BACK_DELETE_AVATAR, config() );
}
