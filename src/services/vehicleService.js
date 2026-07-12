import axios from "axios";
import API from "./api";

export const getVehicles = async () => {
  const response = await axios.get(`${API}/vehicles`);
  return response.data;
};

export const createVehicle = async (vehicle) => {
  const response = await axios.post(`${API}/vehicles`, vehicle);
  return response.data;
};
