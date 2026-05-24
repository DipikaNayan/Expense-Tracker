import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

// Create context
export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  // TOKEN STATE
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Axios instance
  const API = axios.create({
    baseURL: "http://localhost:3000/api",
  });

  // Attach token (FIXED - no multiple interceptors)
  useEffect(() => {
    const interceptor = API.interceptors.request.use((req) => {
      if (token) {
        req.headers.Authorization = `Bearer ${token}`;
      }
      return req;
    });

    return () => API.interceptors.request.eject(interceptor);
  }, [token]);

  //  EXPENSE FUNCTIONS

  // Get all transactions
  const getTransactions = async () => {
    try {
      const res = await API.get("/expenses/all", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("API RESPONSE: ", res.data);

      setTransactions(
        Array.isArray(res.data.expenses) ? res.data.expenses : [],
      );
    } catch (error) {
      console.error("GET ERROR: ", error);
      setTransactions([]);
    }
  };

  // Add transaction
  const addTransaction = async (transaction) => {
    try {
      await API.post("/expenses/create", transaction, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      await getTransactions();
    } catch (error) {
      console.error("ADD ERROR: ", error);
    }
  };

  // Delete transaction
  const deleteTransaction = async (id) => {
    try {
      await API.delete(`/expenses/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      await getTransactions();
    } catch (error) {
      console.error("DELETE ERROR: ", error);
    }
  };

  // FILTER FUNCTION

  const filterByDate = (startDate, endDate) => {
    const filtered = transactions.filter((t) => {
      const tDate = new Date(t.date);
      return tDate >= new Date(startDate) && tDate <= new Date(endDate);
    });

    setFilteredTransactions(filtered);
  };

  // AUTH FUNCTIONS

  // Register
  const registerUser = async (data) => {
    try {
      const res = await API.post("/auth/register", data);
      console.log(res.data);
      return { success: true };
    } catch (error) {
      console.log("REGISTER ERROR: ", error.response?.data);
      return { success: false };
    }
  };

  // Login
  const loginUser = async (data) => {
    try {
      console.log("SENDING LOGIN: ", data);

      const res = await axios.post(
        "http://localhost:3000/api/auth/login",
        data,
      );

      console.log("LOGIN RESPONSE: ", res.data);

      // Store token
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // Update state
      setToken(res.data.token);

      // Fetch data immediately
      await getTransactions();

      return { success: true };
    } catch (error) {
      console.log("LOGIN ERROR: ", error.response?.data);
      return { success: false };
    }
  };

  // Logout
  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setTransactions([]);
    setFilteredTransactions([]);

    //window.location.href = "/";
  };

  // LOAD DATA WHEN TOKEN EXISTS

  useEffect(() => {
    if (token) {
      getTransactions();
    }
  }, [token]);

  // PROVIDER

  return (
    <GlobalContext.Provider
      value={{
        transactions,
        filteredTransactions,
        setFilteredTransactions,
        addTransaction,
        deleteTransaction,
        filterByDate,
        registerUser,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
