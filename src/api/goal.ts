import { httpClient } from "~/lib/request";

const getList = () => {
  return httpClient.get("goal");
};

const getCurrentById = (id: number) => {
  return httpClient.get(`goal/${id}`);
};

const create = (values) => {
  return httpClient.post("goal", values);
};

const setPlanIsComplete = (id) => {
  return httpClient.put(`goal/plan/${id}`);
};

export const goalApi = {
  create,
  getList,
  getCurrentById,
  setPlanIsComplete,
};
