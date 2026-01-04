import axios from "axios";
import { BASE_URL } from "../config";

export const fetchChildren = (id) =>
  axios.get(`${BASE_URL}/nodes/${id}/children`);

export const fetchTree = () =>
  axios.get(`${BASE_URL}/nodes/tree`);

export const createNode = (data) =>
  axios.post(`${BASE_URL}/nodes`, data);

export const renameNode = (id, data) =>
  axios.patch(`${BASE_URL}/nodes/${id}`, data);

export const deleteNode = (id) =>
  axios.delete(`${BASE_URL}/nodes/${id}`);
