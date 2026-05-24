import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api",
});

// AUTH APIs
export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);

// EXPENSE APIs
export const getExpenses = () => API.get("/expenses/all");
export const addExpense = (data) => API.post("/expenses/create", data);
export const deleteExpense = (id) => API.delete(`/expenses/delete/${id}`);
export const updateExpense = (id, data) =>
  API.put(`/expenses/update/${id}`, data);
export const getTotal = () => API.get("/expenses/total");

export default API;
