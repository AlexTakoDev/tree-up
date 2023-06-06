import {
 URL_BACK_TECHNOS,
 URL_BACK_TECHNOS_ADD,
 URL_BACK_TECHNOS_DELETE,
 URL_BACK_TECHNOS_PROJECT,
 URL_BACK_TECHNOS_PROJECT_ADD,
 URL_BACK_TECHNOS_PROJECT_DELETE,
 URL_BACK_TECHNOS_PUT,
} from "../../constants/urls/urlBackEnd";

import apiGateway from "./apiGateway";
import { getToken } from "../../services/tokenServices";

const token = getToken();

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};



export function getTechnoAll(){
 const token = getToken();
 return apiGateway.get(URL_BACK_TECHNOS);
}

export function getTechnoUuid(uuid) {
 const token = getToken();
 return apiGateway.get(`${URL_BACK_TECHNOS}/${uuid}`, {
   headers: {
     Authorization: `Bearer ${token}`,
   },
 });
}
export function PostTechnoAdd(values) {
 return apiGateway.post(URL_BACK_TECHNOS_ADD, values, config);
}

export function putTechnoUuid(uuid, values) {
 return apiGateway.put(`${URL_BACK_TECHNOS_PUT}/:${uuid}`, values, config);
}

export function deleteTechno(values) {
 return apiGateway.delete(URL_BACK_TECHNOS_DELETE, values, config);
}

//Technos et projects

export function PostTechno_ProjectAdd(values) {
 return apiGateway.post(URL_BACK_TECHNOS_PROJECT_ADD, values, config);
}

export function getTechno_project(uuid) {
 return apiGateway.get(`${URL_BACK_TECHNOS_PROJECT}/:${uuid}`, config);
}

export function deleteTechno_project (values) {
 return apiGateway.delete(URL_BACK_TECHNOS_PROJECT_DELETE, values, config);
}

