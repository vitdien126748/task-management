import type { Task } from "../type";
import apiClient from "../lib/apiClient";

export const baseUrl = "https://server.aptech.io";

export const getTasks = async () => {
  const response: Task[] = await apiClient.get("/workspaces/tasks");
  return response;
};

export const getTasksByAssignee = async (assigneeId: number) => {
  const response: Task[] = await apiClient.get(
    `/workspaces/tasks/assignee/${assigneeId}`
  );
  return response;
};

export const createTask = async (task: Task) => {
  const response: Task = await apiClient.post("/workspaces/tasks", task);
  return response;
};

export const getTaskById = async (id: number) => {
  const response: Task = await apiClient.get(`/workspaces/tasks/${id}`);
  return response;
};

export const updateTask = async (id: number, task: Task) => {
  const response: Task = await apiClient.patch(`/workspaces/tasks/${id}`, task);
  return response;
};

export const deleteTask = async (id: number) => {
  const response: Task = await apiClient.delete(`/workspaces/tasks/${id}`);
  return response;
};
