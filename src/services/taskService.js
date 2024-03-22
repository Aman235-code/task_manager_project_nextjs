import { httpAxios } from "@/helper/httpHelper";

export async function addTask(task) {
  const res = await httpAxios
    .post("/api/tasks", task)
    .then((response) => response.data);
  return res;
}

export async function DeleteTask(taskId) {
  const res = await httpAxios
    .delete(`/api/tasks/${taskId}`)
    .then((response) => response.data);
  return res;
}
