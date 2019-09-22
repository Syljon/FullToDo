import axios from "axios";

export function getTasks() {
  return axios
    .get("/api/task/")
    .then(res => res.data)
    .catch(err => err);
}
