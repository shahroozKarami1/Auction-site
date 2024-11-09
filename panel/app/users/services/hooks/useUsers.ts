import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchUsers,
  fetchUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../api/usersAPI";

export const useUsers = (page: number, filters?: object) => {
  return useQuery(["users", page, filters], () => fetchUsers(page, filters), {
    keepPreviousData: true,
  });
};

export const useUserById = (id: string) => {
  return useQuery(["user", id], () => fetchUserById);
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation(createUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
    },
  });
};

export const useUpdateUser = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation((user: any) => updateUser(id, user), {
    onSuccess: () => {
      queryClient.invalidateQueries(["user", id]);
      queryClient.invalidateQueries("users");
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
    },
  });
};
