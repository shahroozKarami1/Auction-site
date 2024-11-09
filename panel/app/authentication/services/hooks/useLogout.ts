import { clearTokens } from "@/app/utils/token";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const useLogout = () => {
  return useMutation(async () => {
    await axios.post("/api/logout");
    clearTokens();
  });
};

export default useLogout;
