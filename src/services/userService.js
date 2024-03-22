import { httpAxios } from "@/helper/httpHelper";

export async function Signup(user) {
  const res = await httpAxios
    .post("/api/users", user)
    .then((response) => response.data);
  return res;
}

export async function login(logindata) {
  const res = await httpAxios
    .post("/api/login", logindata)
    .then((response) => response.data);
  return res;
}

export async function current() {
  const res = await httpAxios
    .get("/api/current")
    .then((response) => response.data);
  return res;
}

export async function logout() {
  const res = await httpAxios
    .post("/api/logout")
    .then((response) => response.data);
  return res;
}

export async function getTasksOfUser(userId) {
  const res = await httpAxios
    .get(`/api/users/${userId}/tasks`)
    .then((response) => response.data);
  return res;
}
