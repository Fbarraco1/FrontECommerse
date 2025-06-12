import axios from "axios";
import { useAuth } from "../context/AuthContext";

export const useAxiosWithAuth = () => {
  const { token } = useAuth();

  const instance = axios.create({
    baseURL: "http://localhost:9000",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return instance;
};
