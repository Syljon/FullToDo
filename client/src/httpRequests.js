import axios from "axios";

export function getTasks() {
  return axios
    .get("/api/task/")
    .then(res => res.data)
    .catch(err => err);
}
export function getTask(id) {
  return axios
    .get("/api/task/" + id)
    .then(res => res.data)
    .catch(err => err);
}

export function createTask(body) {
  body.createdDate = new Date();
  return axios
    .post("/api/task/", body)
    .then(res => res.data)
    .catch(err => err);
}
export function updateTask(body) {
  body.createdDate = new Date();
  return axios
    .put("/api/task/" + body._id, body)
    .then(res => res.data)
    .catch(err => err);
}
export function deleteTask(id) {
  return axios
    .delete("/api/task/" + id)
    .then(res => res.data)
    .catch(err => err);
}
