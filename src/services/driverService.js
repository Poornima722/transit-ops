import axios from "axios";
import API from "./api";

export const getDrivers = async () => {
  const response = await axios.get(`${API}/drivers`);
  return response.data;
};

export const createDriver = async (driver) => {
  const response = await axios.post(`${API}/drivers`, driver);
  return response.data;
};
