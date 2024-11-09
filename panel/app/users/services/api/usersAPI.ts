import api from "@/app/utils/axios";
import axios from "axios";

const API_URL = "/admin-panels/users/";

export const fetchUsers = async (page: number, filters?: object) => {
  const { data } = await api.get(API_URL, {
    params: { page, ...filters },
  });
  console.log(data);
  return data;
};

export const fetchUserById = async (id: string) => {
  const { data } = await api.get(`${API_URL}${id}/`);
  return data;
};

export const createUser = async (user: User) => {
  const { data } = await api.post(API_URL, user);
  return data;
};

export const updateUser = async (id: string, user: User) => {
  const { data } = await api.put(`${API_URL}${id}/`, user);
  return data;
};

export const deleteUser = async (id: string) => {
  const { data } = await api.delete(`${API_URL}${id}/`);
  return data;
};
