import axios from "axios";
import API from "./api";

export const getTrips = async () => {
  const response = await axios.get(`${API}/trips`);
  return response.data;
};

export const createTrip = async (trip) => {
  const response = await axios.post(`${API}/trips`, trip);
  return response.data;
};

export const dispatchTrip = async (tripId) => {
  const response = await axios.post(`${API}/trips/${tripId}/dispatch`);
  return response.data;
};

export const completeTrip = async (tripId, data) => {
  const response = await axios.post(`${API}/trips/${tripId}/complete`, data);
  return response.data;
};

export const cancelTrip = async (tripId) => {
  const response = await axios.post(`${API}/trips/${tripId}/cancel`);
  return response.data;
};
