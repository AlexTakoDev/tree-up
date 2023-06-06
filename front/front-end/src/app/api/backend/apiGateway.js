import axios from "axios";

/**
 * Instance axios to the BACKEND
 *
 * @author Peter Mollet
 */
// const apiBackEnd = axios.create({
//   baseURL: "http://localhost:8080/api",
// });
// export default apiBackEnd;

const apiGateway = axios.create({
  baseURL: "http://localhost:8000/tree-up-api",
});

export default apiGateway;
