// hooks/useAxios.ts
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@store/store";
import React from "react";

const useAxios = () => {
  const { token } = useSelector((state: RootState) => state.auth);

  const axiosInstance = React.useMemo(() => {
    return axios.create({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }, [token]);

  return axiosInstance;
};

export default useAxios;
