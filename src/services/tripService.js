import axios from "axios";

const API = "http://127.0.0.1:8000";

export const getTrips = async () => {
  const res = await axios.get(`${API}/trips/`);
  return res.data;
};

export const createTrip = async (trip) => {
  const res = await axios.post(`${API}/trips/`, trip);
  return res.data;
};

export const dispatchTrip = async (tripId) => {
  const res = await axios.post(`${API}/trips/${tripId}/dispatch`);
  return res.data;
};

export const completeTrip = async (tripId, data) => {
  const res = await axios.post(`${API}/trips/${tripId}/complete`, data);
  return res.data;
};

export const cancelTrip = async (tripId) => {
  const res = await axios.post(`${API}/trips/${tripId}/cancel`);
  return res.data;
};
