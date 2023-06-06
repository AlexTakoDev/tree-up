import { URL_BACK_ADDCOLL, URL_BACK_USER } from "../../constants/urls/urlBackEnd";

import apiGateway from "./apiGateway";
import { getToken } from "../../services/tokenServices";

const token = getToken();

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

export function addCollPost(values) {
 return apiGateway.post('/collaborators/add/', values, config);
}
export function getColl(){
 return apiGateway.get(URL_BACK_USER, config);
}


// localhost:8000/http://localhost:8000/tree-up-api/addcoll/    body: {values} 