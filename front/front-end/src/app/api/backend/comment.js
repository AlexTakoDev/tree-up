import { URL_BACK_COMMENT } from "../../constants/urls/urlBackEnd";
import { configHeaders } from "../../services/tokenServices";
import apiGateway from "./apiGateway";

export function commentPost(values) {
  return apiGateway.post(URL_BACK_COMMENT, values, configHeaders());
}

export function getAllComments() {
  return apiGateway.get(URL_BACK_COMMENT);
}

export function updateComment(values) {
  return apiGateway.put(URL_BACK_COMMENT, values, configHeaders());
}

export function getCommentByProjectId(id) {
  return apiGateway.get(URL_BACK_COMMENT + `/${id}`);
}

export function deleteComment(id) {
  return apiGateway.delete(URL_BACK_COMMENT + `/${id}`, configHeaders());
}
